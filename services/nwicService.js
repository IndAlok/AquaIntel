const BASE_URL = process.env.EXPO_PUBLIC_NWIC_API_URL;
const USE_REAL_DATA = process.env.EXPO_PUBLIC_USE_REAL_DATA === 'true';
const DEFAULT_LIMIT = 1000;
const RATE_DELAY_MS = 500;
const STALE_DAYS = 30;

const HARDCODED_RESOURCES = {
  gw_level_ts: [
    '8b8f17d0-b56e-4bdc-8d62-9d26d5a4db1e',
    'e24d301d-5031-44cb-9972-f46972bc2c69',
    '3e596059-2542-41c7-88ad-d5efe4aac107',
  ],
  rainfall: [
    'c1a15f25-fa47-4313-a5d0-afbda01ac2f2',
    '1db0a829-05f8-4e02-b125-e74d3242789c',
    '241b4002-4054-43e6-85c4-d56fb486371f',
  ],
  water_quality: [
    '5b6b9c20-0af6-4af4-bb0c-16cb7d40b10e',
    '9221eabd-c583-469b-87a9-7da93d49dabb',
    'c492f113-a81c-4a43-90e5-65fdbc94ef1a',
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toNumber = (value) => {
  if (value === undefined || value === null) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const toISODate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split('T')[0];
};

const isFresh = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return false;
  const ageDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
  return ageDays <= STALE_DAYS;
};

class NWICService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async queryNWIC(resourceId, filters = {}, limit = DEFAULT_LIMIT) {
    if (!USE_REAL_DATA || !this.baseUrl || !resourceId) return [];

    const body = { resource_id: resourceId.trim(), filters, limit };

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      return data.result?.records || [];
    } catch (error) {
      console.error('NWIC Query Error:', error?.message || error);
      return [];
    }
  }

  async queryNational(domain, filters = {}, limit = DEFAULT_LIMIT) {
    const envKey = `EXPO_PUBLIC_NWIC_${domain.toUpperCase().replace(/-/g, '_')}_RESOURCE_ID`;
    const envResource = process.env[envKey];
    const seeds = HARDCODED_RESOURCES[domain] || [];
    const resourceIds = [...new Set([envResource, ...seeds].filter(Boolean))];

    let allRecords = [];
    for (const id of resourceIds) {
      const records = await this.queryNWIC(id, filters, limit);
      if (records?.length) {
        allRecords = allRecords.concat(records);
      }
      await delay(RATE_DELAY_MS);
    }
    return allRecords;
  }

  mapStationRecord(record, domain) {
    const stationCode =
      record.station_code || record.station_id || record.well_code || record.site_code;
    if (!stationCode) return null;

    const latitude = toNumber(
      record.latitude || record.lat || record.y_latitude || record.latitude_n
    );
    const longitude = toNumber(
      record.longitude || record.lng || record.x_longitude || record.longitude_e
    );
    const gwLevel = toNumber(
      record.water_level_mbgl || record.depth_to_water_level_m || record.water_level_m_bgl
    );
    const rainfallMm = toNumber(record.rainfall_mm || record.rainfall || record.rainfall_amount_mm);
    const depth = toNumber(
      record.well_depth_m || record.depth_to_water_level_m || record.well_depth
    );

    const lastUpdatedRaw =
      record.observation_datetime || record.date || record.sampling_date || record.updated_at;
    const lastUpdated = toISODate(lastUpdatedRaw);

    return {
      id: stationCode,
      name: record.station_name || record.site_name || `${stationCode} Station`,
      state: record.state || record.state_name,
      district: record.district || record.district_name,
      latitude,
      longitude,
      currentLevel: domain === 'rainfall' ? rainfallMm : gwLevel,
      currentWaterLevel: gwLevel,
      rainfall: rainfallMm,
      depth,
      status: isFresh(lastUpdated) ? 'Active' : 'Inactive',
      lastUpdated,
      sourceDomain: domain,
    };
  }

  mergeStations(records) {
    const map = new Map();

    records.forEach((rec) => {
      if (!rec) return;
      const key = `${rec.id}-${rec.state || ''}`;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, rec);
        return;
      }

      const pickLatest = (field) => {
        if (!existing[field]) return rec[field];
        if (!rec[field]) return existing[field];
        return new Date(rec.lastUpdated) > new Date(existing.lastUpdated)
          ? rec[field]
          : existing[field];
      };

      map.set(key, {
        ...existing,
        latitude: existing.latitude ?? rec.latitude,
        longitude: existing.longitude ?? rec.longitude,
        currentLevel: pickLatest('currentLevel'),
        currentWaterLevel: pickLatest('currentWaterLevel'),
        rainfall: pickLatest('rainfall'),
        depth: existing.depth ?? rec.depth,
        lastUpdated: pickLatest('lastUpdated'),
        status: isFresh(pickLatest('lastUpdated')) ? 'Active' : 'Inactive',
      });
    });

    return Array.from(map.values()).filter(
      (s) => toNumber(s.latitude) !== null && toNumber(s.longitude) !== null
    );
  }

  async getStations() {
    const [gwRecords, rainfallRecords] = await Promise.all([
      this.queryNational('gw_level_ts', {}),
      this.queryNational('rainfall', {}),
    ]);

    const mapped = [
      ...gwRecords.map((r) => this.mapStationRecord(r, 'gw_level_ts')).filter(Boolean),
      ...rainfallRecords.map((r) => this.mapStationRecord(r, 'rainfall')).filter(Boolean),
    ];

    const merged = this.mergeStations(mapped);
    return merged.filter((station) => isFresh(station.lastUpdated));
  }

  async getGroundwaterTimeseries(stationId, limit = 365) {
    const records = await this.queryNational('gw_level_ts', { station_code: stationId }, limit);
    return records
      .map((rec) => {
        const date = toISODate(rec.observation_datetime || rec.date);
        const level = toNumber(
          rec.water_level_mbgl || rec.depth_to_water_level_m || rec.water_level_m_bgl
        );
        const depth = toNumber(rec.well_depth_m || rec.well_depth);
        if (!date || level === null) return null;
        return { date, level, depth };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  async getRainfall(filters = {}) {
    const records = await this.queryNational('rainfall', filters, 2000);
    const daily = {};

    records.forEach((rec) => {
      const date = toISODate(rec.observation_datetime || rec.date);
      const rainfall = toNumber(rec.rainfall_mm || rec.rainfall || rec.rainfall_amount_mm);
      if (!date || rainfall === null) return;
      daily[date] = (daily[date] || 0) + rainfall;
    });

    return Object.entries(daily)
      .map(([date, rainfall_mm]) => ({ date, rainfall_mm }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async getWaterQuality(stationId) {
    const filters = stationId ? { station_name: stationId } : {};
    const records = await this.queryNational('water_quality', filters, 500);
    if (!records.length) return null;

    const latest = records.sort(
      (a, b) =>
        new Date(b.sampling_date || b.observation_datetime || b.date) -
        new Date(a.sampling_date || a.observation_datetime || a.date)
    )[0];

    return {
      pH: toNumber(latest.ph),
      tds: toNumber(latest.tds || latest.total_dissolved_solids),
      hardness: toNumber(latest.total_hardness || latest.hardness),
      fluoride: toNumber(latest.fluoride),
      arsenic: toNumber(latest.arsenic),
      nitrate: toNumber(latest.nitrate),
      lastUpdated: toISODate(latest.sampling_date || latest.observation_datetime || latest.date),
    };
  }

  async getStateStats() {
    const stations = await this.getStations();
    const rainfallRecords = await this.queryNational('rainfall', {}, 2000);

    const statsByState = {};

    stations.forEach((station) => {
      const state = station.state || 'Unknown';
      statsByState[state] = statsByState[state] || {
        state,
        totalStations: 0,
        activeStations: 0,
        criticalStations: 0,
        avgWaterLevel: 0,
        _levelCount: 0,
        avgRainfall: 0,
        _rainfallSum: 0,
        _rainfallCount: 0,
        source: 'Derived from NWIC CGWB/CWC',
      };

      const bucket = statsByState[state];
      bucket.totalStations += 1;
      if (station.status === 'Active') bucket.activeStations += 1;
      if ((station.currentWaterLevel || 0) > 20) bucket.criticalStations += 1;
      if (toNumber(station.currentWaterLevel) !== null) {
        bucket._levelCount += 1;
        bucket.avgWaterLevel =
          (bucket.avgWaterLevel * (bucket._levelCount - 1) + Number(station.currentWaterLevel)) /
          bucket._levelCount;
      }
    });

    rainfallRecords.forEach((rec) => {
      const state = rec.state || 'Unknown';
      const rainfall = toNumber(rec.rainfall_mm || rec.rainfall || rec.rainfall_amount_mm);
      if (rainfall === null) return;
      statsByState[state] = statsByState[state] || {
        state,
        totalStations: 0,
        activeStations: 0,
        criticalStations: 0,
        avgWaterLevel: 0,
        _levelCount: 0,
        avgRainfall: 0,
        _rainfallSum: 0,
        _rainfallCount: 0,
        source: 'Derived from NWIC CGWB/CWC',
      };
      const bucket = statsByState[state];
      bucket._rainfallSum += rainfall;
      bucket._rainfallCount += 1;
      bucket.avgRainfall = bucket._rainfallCount ? bucket._rainfallSum / bucket._rainfallCount : 0;
    });

    return Object.values(statsByState).map((bucket) => ({
      state: bucket.state,
      totalStations: bucket.totalStations,
      activeStations: bucket.activeStations,
      criticalStations: bucket.criticalStations,
      avgWaterLevel: Number(bucket.avgWaterLevel.toFixed(2)),
      avgRainfall: Number(bucket.avgRainfall.toFixed(2)),
      groundwaterAvailability:
        bucket.avgWaterLevel > 25
          ? 'Critical'
          : bucket.avgWaterLevel > 15
            ? 'Semi-Critical'
            : 'Safe',
      source: bucket.source,
    }));
  }

  async getDroughtData() {
    const stations = await this.getStations();
    const rainfallRecords = await this.queryNational('rainfall', {}, 2000);

    const rainfallByDistrict = {};
    rainfallRecords.forEach((rec) => {
      const key = `${rec.state || 'Unknown'}|${rec.district || 'Unknown'}`;
      const rainfall = toNumber(rec.rainfall_mm || rec.rainfall || rec.rainfall_amount_mm);
      if (rainfall === null) return;
      rainfallByDistrict[key] = rainfallByDistrict[key] || {
        total: 0,
        count: 0,
        state: rec.state,
        district: rec.district,
      };
      rainfallByDistrict[key].total += rainfall;
      rainfallByDistrict[key].count += 1;
    });

    const avgRainfall = Object.values(rainfallByDistrict).reduce(
      (sum, r) => sum + r.total / Math.max(r.count, 1),
      0
    );
    const globalRainAvg = avgRainfall / Math.max(Object.keys(rainfallByDistrict).length, 1);

    const stationByDistrict = stations.reduce((acc, station) => {
      const key = `${station.state || 'Unknown'}|${station.district || 'Unknown'}`;
      acc[key] = acc[key] || { state: station.state, district: station.district, levels: [] };
      if (toNumber(station.currentWaterLevel) !== null)
        acc[key].levels.push(Number(station.currentWaterLevel));
      return acc;
    }, {});

    return Object.entries(rainfallByDistrict).map(([key, rain]) => {
      const [state, district] = key.split('|');
      const rainfallAvg = rain.total / Math.max(rain.count, 1);
      const stationInfo = stationByDistrict[key];
      const levelAvg = stationInfo?.levels?.length
        ? stationInfo.levels.reduce((a, b) => a + b, 0) / stationInfo.levels.length
        : null;

      const rainfallDeficit = rainfallAvg < globalRainAvg * 0.8;
      const groundwaterDecline = levelAvg !== null && levelAvg > 20;

      let severity = 'Normal';
      if (rainfallDeficit && groundwaterDecline) severity = 'Severe';
      else if (rainfallDeficit || groundwaterDecline) severity = 'Moderate';

      return {
        state,
        district,
        severity,
        affectedArea: Math.round((stationInfo?.levels?.length || 1) * 50),
        population: Math.round((stationInfo?.levels?.length || 1) * 10000),
        source: 'Derived from NWIC rainfall + groundwater',
      };
    });
  }
}

export const nwicService = new NWICService();
export default nwicService;
