import govAPI from './governmentAPI';
import nwicService from './nwicService';
import { mockStations } from '../data/mockStations';
import { getRecentTimeSeriesData } from '../data/mockTimeSeriesData';
import { getRainfallData as generateRainfallData } from '../data/mockRainfallData';
import { getPredictions, getRiskAssessment, getAIInsights } from '../data/mockPredictions';

class DataService {
  constructor() {
    this.useRealData = process.env.EXPO_PUBLIC_USE_REAL_DATA === 'true';
    this.nwicAvailable = !!process.env.EXPO_PUBLIC_NWIC_API_URL;
    this.cache = { stations: null, lastFetch: null, cacheDuration: 5 * 60 * 1000 };
  }

  normalizeStation(s) {
    if (!s) return null;
    const lvl = s.currentLevel ?? s.currentWaterLevel ?? s.level ?? 0;
    return {
      ...s,
      currentLevel: lvl,
      currentWaterLevel: s.currentWaterLevel ?? lvl,
      latitude: s.latitude ?? s.location?.latitude ?? s.lat,
      longitude: s.longitude ?? s.location?.longitude ?? s.lng,
      lastUpdated: s.lastUpdated || s.updatedAt || new Date().toISOString(),
    };
  }

  async getStations(force = false) {
    if (
      !force &&
      this.cache.stations &&
      this.cache.lastFetch &&
      Date.now() - this.cache.lastFetch < this.cache.cacheDuration
    )
      return this.cache.stations;
    if (this.useRealData) {
      try {
        const nwic = this.nwicAvailable ? await nwicService.getStations() : [];
        if (nwic?.length) {
          this.cache.stations = nwic.map((s) => this.normalizeStation(s));
          this.cache.lastFetch = Date.now();
          return this.cache.stations;
        }
      } catch (e) {}
      try {
        const gov = await govAPI.fetchDWLRStations();
        if (gov?.length) {
          this.cache.stations = gov.map((s) => this.normalizeStation(s));
          this.cache.lastFetch = Date.now();
          return this.cache.stations;
        }
      } catch (e) {}
    }
    this.cache.stations = mockStations.map((s) => this.normalizeStation(s));
    this.cache.lastFetch = Date.now();
    return this.cache.stations;
  }

  async getWaterLevelData(stationId, days = 30) {
    if (this.useRealData) {
      try {
        const d = this.nwicAvailable
          ? await nwicService.getGroundwaterTimeseries(stationId, days)
          : [];
        if (d?.length) return d;
      } catch (e) {}
      try {
        const d = await govAPI.fetchWaterLevelData(stationId, days);
        if (d?.length) return d;
      } catch (e) {}
    }
    return getRecentTimeSeriesData(stationId, days);
  }

  async getRainfallData(state, district, year) {
    if (this.useRealData) {
      try {
        const f = {};
        if (state) f.state = state;
        if (district) f.district = district;
        if (year) f.year = year;
        const d = this.nwicAvailable ? await nwicService.getRainfall(f) : null;
        if (d?.length) return d;
      } catch (e) {}
      try {
        const d = await govAPI.fetchRainfallData(state, district, year);
        if (d) return d;
      } catch (e) {}
    }
    return generateRainfallData(district, 365);
  }

  async getPredictions(stationId) {
    return getPredictions(stationId);
  }

  async getWaterQuality(stationId) {
    if (this.useRealData) {
      try {
        const d = this.nwicAvailable ? await nwicService.getWaterQuality(stationId) : null;
        if (d) return d;
      } catch (e) {}
      try {
        const d = await govAPI.fetchWaterQualityData(stationId);
        if (d) return d;
      } catch (e) {}
    }
    return {
      ph: (6.5 + Math.random() * 2).toFixed(1),
      tds: Math.floor(200 + Math.random() * 500),
      hardness: Math.floor(100 + Math.random() * 300),
      fluoride: (0.5 + Math.random() * 1).toFixed(2),
      arsenic: (0.001 + Math.random() * 0.01).toFixed(3),
      nitrate: Math.floor(10 + Math.random() * 40),
      lastUpdated: new Date().toISOString(),
    };
  }

  async getStateStats(state) {
    if (this.useRealData) {
      try {
        if (this.nwicAvailable) {
          const ns = await nwicService.getStateStats();
          if (ns?.length) return state ? ns.find((s) => s.state === state) || null : ns;
        }
      } catch (e) {}
      try {
        const d = await govAPI.fetchStateStatistics(state);
        if (d) return d;
      } catch (e) {}
    }
    const ss = mockStations.filter((s) => s.state === state).map((s) => this.normalizeStation(s));
    return {
      totalStations: ss.length,
      activeStations: ss.filter((s) => s.status === 'Active').length,
      criticalStations: ss.filter((s) => s.status === 'Critical').length,
      avgWaterLevel: ss.length
        ? (ss.reduce((a, s) => a + (s.currentLevel || 0), 0) / ss.length).toFixed(2)
        : '0',
    };
  }

  async getDroughtData() {
    if (this.useRealData) {
      try {
        if (this.nwicAvailable) {
          const d = await nwicService.getDroughtData();
          if (d?.length) return d;
        }
      } catch (e) {}
      try {
        const d = await govAPI.fetchDroughtData();
        if (d) return d;
      } catch (e) {}
    }
    return [
      {
        state: 'Rajasthan',
        district: 'Jaisalmer',
        severity: 'Severe',
        affectedArea: 5000,
        population: 150000,
      },
      {
        state: 'Maharashtra',
        district: 'Osmanabad',
        severity: 'Moderate',
        affectedArea: 3000,
        population: 200000,
      },
      {
        state: 'Karnataka',
        district: 'Tumkur',
        severity: 'Moderate',
        affectedArea: 2500,
        population: 180000,
      },
    ];
  }

  async searchStations(q) {
    const s = await this.getStations();
    const lq = q.toLowerCase();
    return s.filter(
      (st) =>
        st.name.toLowerCase().includes(lq) ||
        st.district.toLowerCase().includes(lq) ||
        st.state.toLowerCase().includes(lq)
    );
  }

  async getStationsByFilter(f = {}) {
    const s = await this.getStations();
    return s.filter((st) => {
      if (f.state && st.state !== f.state) return false;
      if (f.district && st.district !== f.district) return false;
      if (f.status && st.status !== f.status) return false;
      if (f.minLevel && st.currentLevel < f.minLevel) return false;
      if (f.maxLevel && st.currentLevel > f.maxLevel) return false;
      return true;
    });
  }

  async getDashboardStats() {
    const s = await this.getStations();
    const a = s.filter((x) => x.status === 'Active').length;
    const c = s.filter((x) => x.status === 'Critical').length;
    const w = s.filter((x) => x.status === 'Warning').length;
    const i = s.filter((x) => x.status === 'Inactive').length;
    const avg = s.length
      ? (s.reduce((t, x) => t + (x.currentLevel || 0), 0) / s.length).toFixed(2)
      : '0';
    return {
      total: s.length,
      active: a,
      critical: c,
      warning: w,
      inactive: i,
      avgWaterLevel: avg,
      monsoonActive: this.isMonsoonActive(),
      dataSource: this.useRealData ? 'Government APIs' : 'Simulated',
      lastUpdated: new Date().toISOString(),
    };
  }

  isMonsoonActive() {
    const m = new Date().getMonth();
    return m >= 5 && m <= 9;
  }
  clearCache() {
    this.cache.stations = null;
    this.cache.lastFetch = null;
  }
  setUseRealData(v) {
    this.useRealData = v;
    this.clearCache();
  }
  getDataSourceInfo() {
    return {
      usingRealData: this.useRealData,
      cacheStatus: this.cache.stations ? 'Active' : 'Empty',
      cacheAge: this.cache.lastFetch ? Math.floor((Date.now() - this.cache.lastFetch) / 1000) : 0,
      dataProvider: this.useRealData ? 'CGWB/WRIS/IMD' : 'Simulated',
    };
  }
  async getRiskAssessment(id) {
    return getRiskAssessment(id);
  }
  async getAIInsights(id) {
    return getAIInsights(id);
  }
}

export const dataService = new DataService();
export default dataService;
