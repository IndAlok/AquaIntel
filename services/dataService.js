// services/dataService.js
// Unified data service that integrates real government data with fallback mock data

import govAPI from './governmentAPI';
import { mockStations } from '../data/mockStations';
import { mockTimeSeriesData } from '../data/mockTimeSeriesData';
import { mockRainfallData } from '../data/mockRainfallData';
import { getPredictions } from '../data/mockPredictions';

class DataService {
  constructor() {
    this.useRealData = process.env.EXPO_PUBLIC_USE_REAL_DATA === 'true';
    this.cache = {
      stations: null,
      lastFetch: null,
      cacheDuration: 5 * 60 * 1000 // 5 minutes
    };
  }

  /**
   * Get all DWLR stations - tries real data first, falls back to mock
   */
  async getStations(forceRefresh = false) {
    // Check cache first
    if (!forceRefresh && this.cache.stations && this.cache.lastFetch) {
      const cacheAge = Date.now() - this.cache.lastFetch;
      if (cacheAge < this.cache.cacheDuration) {
        console.log('📦 Using cached station data');
        return this.cache.stations;
      }
    }

    // Try to fetch real data if enabled
    if (this.useRealData) {
      try {
        console.log('🌐 Attempting to fetch real government data...');
        const realStations = await govAPI.fetchDWLRStations();
        
        if (realStations && realStations.length > 0) {
          console.log(`✅ Successfully fetched ${realStations.length} real stations`);
          this.cache.stations = realStations;
          this.cache.lastFetch = Date.now();
          return realStations;
        }
      } catch (error) {
        console.log('⚠️  Real data fetch failed, using fallback data');
      }
    }

    // Fallback to mock data
    console.log('📊 Using mock station data (5,260 stations simulated)');
    this.cache.stations = mockStations;
    this.cache.lastFetch = Date.now();
    return mockStations;
  }

  /**
   * Get water level data for a specific station
   */
  async getWaterLevelData(stationId, days = 30) {
    if (this.useRealData) {
      try {
        const realData = await govAPI.fetchWaterLevelData(stationId, days);
        if (realData && realData.length > 0) {
          console.log(`✅ Fetched real water level data for station ${stationId}`);
          return realData;
        }
      } catch (error) {
        console.log('⚠️  Using fallback time series data');
      }
    }

    // Fallback to mock data
    return mockTimeSeriesData[stationId] || mockTimeSeriesData['DWLR-001'];
  }

  /**
   * Get rainfall data for a location
   */
  async getRainfallData(state, district, year) {
    if (this.useRealData) {
      try {
        const realData = await govAPI.fetchRainfallData(state, district, year);
        if (realData) {
          console.log(`✅ Fetched real rainfall data for ${district}, ${state}`);
          return realData;
        }
      } catch (error) {
        console.log('⚠️  Using fallback rainfall data');
      }
    }

    // Fallback to mock data
    return mockRainfallData;
  }

  /**
   * Get predictions/forecasts for a station
   */
  async getPredictions(stationId) {
    // ML predictions - always use generated data for now
    // In production, this would call a prediction API endpoint
    return getPredictions(stationId);
  }

  /**
   * Get water quality data
   */
  async getWaterQuality(stationId) {
    if (this.useRealData) {
      try {
        const realData = await govAPI.fetchWaterQualityData(stationId);
        if (realData) {
          console.log(`✅ Fetched real water quality data`);
          return realData;
        }
      } catch (error) {
        console.log('⚠️  Using generated quality data');
      }
    }

    // Generate mock quality data
    return {
      ph: (6.5 + Math.random() * 2).toFixed(1),
      tds: Math.floor(200 + Math.random() * 500),
      hardness: Math.floor(100 + Math.random() * 300),
      fluoride: (0.5 + Math.random() * 1).toFixed(2),
      arsenic: (0.001 + Math.random() * 0.01).toFixed(3),
      nitrate: Math.floor(10 + Math.random() * 40),
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Get state-wise statistics
   */
  async getStateStats(state) {
    if (this.useRealData) {
      try {
        const realStats = await govAPI.fetchStateStatistics(state);
        if (realStats) {
          console.log(`✅ Fetched real statistics for ${state}`);
          return realStats;
        }
      } catch (error) {
        console.log('⚠️  Using calculated statistics from mock data');
      }
    }

    // Calculate from mock data
    const stateStations = mockStations.filter(s => s.state === state);
    return {
      totalStations: stateStations.length,
      activeStations: stateStations.filter(s => s.status === 'Active').length,
      criticalStations: stateStations.filter(s => s.status === 'Critical').length,
      avgWaterLevel: (stateStations.reduce((sum, s) => sum + s.currentLevel, 0) / stateStations.length).toFixed(2)
    };
  }

  /**
   * Get drought monitoring data
   */
  async getDroughtData() {
    if (this.useRealData) {
      try {
        const realData = await govAPI.fetchDroughtData();
        if (realData) {
          console.log('✅ Fetched real drought monitoring data');
          return realData;
        }
      } catch (error) {
        console.log('⚠️  Drought data not available');
      }
    }

    // Mock drought data
    return [
      { state: 'Rajasthan', district: 'Jaisalmer', severity: 'Severe', affectedArea: 5000, population: 150000 },
      { state: 'Maharashtra', district: 'Osmanabad', severity: 'Moderate', affectedArea: 3000, population: 200000 },
      { state: 'Karnataka', district: 'Tumkur', severity: 'Moderate', affectedArea: 2500, population: 180000 }
    ];
  }

  /**
   * Search stations by name or location
   */
  async searchStations(query) {
    const stations = await this.getStations();
    const lowercaseQuery = query.toLowerCase();
    
    return stations.filter(station => 
      station.name.toLowerCase().includes(lowercaseQuery) ||
      station.district.toLowerCase().includes(lowercaseQuery) ||
      station.state.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Get stations by filter criteria
   */
  async getStationsByFilter(filter = {}) {
    const stations = await this.getStations();
    
    return stations.filter(station => {
      if (filter.state && station.state !== filter.state) return false;
      if (filter.district && station.district !== filter.district) return false;
      if (filter.status && station.status !== filter.status) return false;
      if (filter.minLevel && station.currentLevel < filter.minLevel) return false;
      if (filter.maxLevel && station.currentLevel > filter.maxLevel) return false;
      return true;
    });
  }

  /**
   * Get dashboard summary statistics
   */
  async getDashboardStats() {
    const stations = await this.getStations();
    
    const activeCount = stations.filter(s => s.status === 'Active').length;
    const criticalCount = stations.filter(s => s.status === 'Critical').length;
    const warningCount = stations.filter(s => s.status === 'Warning').length;
    const inactiveCount = stations.filter(s => s.status === 'Inactive').length;
    
    const totalWaterLevel = stations.reduce((sum, s) => sum + (s.currentLevel || 0), 0);
    const avgWaterLevel = (totalWaterLevel / stations.length).toFixed(2);
    
    return {
      total: stations.length,
      active: activeCount,
      critical: criticalCount,
      warning: warningCount,
      inactive: inactiveCount,
      avgWaterLevel,
      monsoonActive: this.isMonsoonActive(),
      dataSource: this.useRealData ? 'Government APIs (with fallback)' : 'Simulated Data',
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Check if monsoon season is active
   */
  isMonsoonActive() {
    const month = new Date().getMonth(); // 0-11
    return month >= 5 && month <= 9; // June to October
  }

  /**
   * Clear cache to force data refresh
   */
  clearCache() {
    this.cache.stations = null;
    this.cache.lastFetch = null;
    console.log('🗑️  Cache cleared');
  }

  /**
   * Toggle between real and mock data
   */
  setUseRealData(useReal) {
    this.useRealData = useReal;
    this.clearCache();
    console.log(`📊 Data source: ${useReal ? 'Real Government Data' : 'Mock Data'}`);
  }

  /**
   * Get data source information
   */
  getDataSourceInfo() {
    return {
      usingRealData: this.useRealData,
      cacheStatus: this.cache.stations ? 'Active' : 'Empty',
      cacheAge: this.cache.lastFetch ? Math.floor((Date.now() - this.cache.lastFetch) / 1000) : 0,
      dataProvider: this.useRealData ? 'CGWB/WRIS/IMD' : 'Simulated'
    };
  }
}

// Export singleton instance
export const dataService = new DataService();

export default dataService;
