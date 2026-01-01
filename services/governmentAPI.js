const API_TIMEOUT = 30000;

class GovernmentAPIService {
  constructor() {
    this.CGWB_URL = 'https://cgwb.gov.in';
    this.WRIS_URL = process.env.EXPO_PUBLIC_WRIS_API_URL || 'https://indiawris.gov.in/wris';
    this.IMD_URL = process.env.EXPO_PUBLIC_IMD_API_URL || 'https://mausam.imd.gov.in';
    
    this.WRIS_API_KEY = process.env.EXPO_PUBLIC_WRIS_API_KEY;
    this.IMD_API_KEY = process.env.EXPO_PUBLIC_IMD_API_KEY;
    
    this.useRealData = process.env.EXPO_PUBLIC_USE_REAL_DATA === 'true';
  }

  async fetchDWLRStations(state = null, district = null) {
    try {
      console.log('ðŸ“¡ Fetching DWLR stations from CGWB...');
      
      const params = new URLSearchParams();
      if (state) params.append('state', state);
      if (district) params.append('district', district);
      
      const url = `${this.CGWB_URL}/api/dwlr-stations?${params}`;
      
      const response = await this.makeRequest(url);
      
      if (response && response.data) {
        console.log(`âœ… Fetched ${response.data.length} DWLR stations`);
        return response.data.map(station => this.transformCGWBStation(station));
      }
      
      throw new Error('No data received from CGWB');
    } catch (error) {
      console.error('â Œ Error fetching CGWB data:', error.message);
      console.log('â„¹ï¸   Using fallback data');
      return null;
    }
  }

  async fetchWaterLevelData(stationId, days = 30) {
    try {
      console.log(`ðŸ“Š Fetching water level data for station: ${stationId}`);
      
      const url = `${this.CGWB_URL}/api/water-levels/${stationId}?days=${days}`;
      const response = await this.makeRequest(url);
      
      if (response && response.data) {
        return response.data.map(reading => ({
          date: reading.date || reading.timestamp,
          level: parseFloat(reading.water_level || reading.level),
          depth: parseFloat(reading.depth_to_water || reading.depth)
        }));
      }
      
      return null;
    } catch (error) {
      console.error(`â Œ Error fetching water level data:`, error.message);
      return null;
    }
  }

  async fetchRainfallData(state, district, year) {
    try {
      console.log(`ðŸŒ§ï¸   Fetching rainfall data for ${district}, ${state}`);
      
      const headers = {};
      if (this.IMD_API_KEY) {
        headers['X-API-Key'] = this.IMD_API_KEY;
      }
      
      const url = `${this.IMD_URL}/api/rainfall?state=${state}&district=${district}&year=${year}`;
      const response = await this.makeRequest(url, headers);
      
      if (response && response.data) {
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('â Œ Error fetching rainfall data:', error.message);
      return null;
    }
  }

  async fetchWaterQualityData(stationId) {
    try {
      console.log(`ðŸ§ª Fetching water quality data for station: ${stationId}`);
      
      const url = `${this.CGWB_URL}/api/water-quality/${stationId}`;
      const response = await this.makeRequest(url);
      
      if (response && response.data) {
        return {
          ph: response.data.ph,
          tds: response.data.tds,
          hardness: response.data.hardness,
          fluoride: response.data.fluoride,
          arsenic: response.data.arsenic,
          nitrate: response.data.nitrate,
          lastUpdated: response.data.date
        };
      }
      
      return null;
    } catch (error) {
      console.error('â Œ Error fetching water quality data:', error.message);
      return null;
    }
  }

  async fetchStateStatistics(state) {
    try {
      console.log(`ðŸ“ˆ Fetching statistics for state: ${state}`);
      
      const url = `${this.WRIS_URL}/api/state-stats/${state}`;
      const headers = {};
      if (this.WRIS_API_KEY) {
        headers['X-API-Key'] = this.WRIS_API_KEY;
      }
      
      const response = await this.makeRequest(url, headers);
      
      if (response && response.data) {
        return {
          totalStations: response.data.total_stations,
          activeStations: response.data.active_stations,
          criticalStations: response.data.critical_stations,
          avgWaterLevel: response.data.avg_water_level,
          avgRainfall: response.data.avg_rainfall,
          groundwaterAvailability: response.data.groundwater_availability
        };
      }
      
      return null;
    } catch (error) {
      console.error('â Œ Error fetching state statistics:', error.message);
      return null;
    }
  }

  async fetchDroughtData() {
    try {
      console.log('ðŸ œï¸   Fetching drought monitoring data...');
      
      const url = `${this.WRIS_URL}/api/drought-monitor`;
      const response = await this.makeRequest(url);
      
      if (response && response.data) {
        return response.data.map(area => ({
          state: area.state,
          district: area.district,
          severity: area.drought_severity,
          affectedArea: area.affected_area_sqkm,
          population: area.affected_population
        }));
      }
      
      return null;
    } catch (error) {
      console.error('â Œ Error fetching drought data:', error.message);
      return null;
    }
  }

  async makeRequest(url, headers = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers
        },
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      clearTimeout(timeout);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - API took too long to respond');
      }
      
      throw error;
    }
  }

  transformCGWBStation(cgwbData) {
    return {
      id: cgwbData.station_id || cgwbData.id,
      name: cgwbData.station_name || cgwbData.name,
      state: cgwbData.state,
      district: cgwbData.district,
      location: {
        latitude: parseFloat(cgwbData.latitude || cgwbData.lat),
        longitude: parseFloat(cgwbData.longitude || cgwbData.lng)
      },
      currentLevel: parseFloat(cgwbData.current_water_level || cgwbData.water_level),
      depth: parseFloat(cgwbData.depth_to_water),
      status: this.determineStatus(cgwbData),
      type: 'DWLR',
      lastUpdated: cgwbData.last_updated || cgwbData.date,
      source: 'CGWB'
    };
  }

  determineStatus(stationData) {
    const waterLevel = parseFloat(stationData.current_water_level || stationData.water_level);
    const criticalLevel = parseFloat(stationData.critical_level || 2);
    const normalLevel = parseFloat(stationData.normal_level || 10);
    
    if (waterLevel < criticalLevel) {
      return 'Critical';
    } else if (waterLevel < normalLevel) {
      return 'Warning';
    } else {
      return 'Active';
    }
  }

  async checkAPIAvailability() {
    const apis = {
      cgwb: false,
      wris: false,
      imd: false
    };
    
    try {
      const cgwbResponse = await fetch(`${this.CGWB_URL}/api/health`, { method: 'HEAD' });
      apis.cgwb = cgwbResponse.ok;
    } catch (error) {
      console.log('CGWB API not available');
    }
    
    try {
      const wrisResponse = await fetch(`${this.WRIS_URL}/api/health`, { method: 'HEAD' });
      apis.wris = wrisResponse.ok;
    } catch (error) {
      console.log('WRIS API not available');
    }
    
    try {
      const imdResponse = await fetch(`${this.IMD_URL}/api/health`, { method: 'HEAD' });
      apis.imd = imdResponse.ok;
    } catch (error) {
      console.log('IMD API not available');
    }
    
    return apis;
  }
}

export const govAPI = new GovernmentAPIService();

export default govAPI;
