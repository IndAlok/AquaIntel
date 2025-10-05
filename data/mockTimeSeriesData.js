// data/mockTimeSeriesData.js
// Generates realistic time-series water level data with seasonal variations

import { mockStations } from './mockStations';

/**
 * Generate hourly water level data for the past 2 years
 * Simulates:
 * - Seasonal variations (lower in summer, higher post-monsoon)
 * - Daily fluctuations
 * - Long-term trends
 * - Recharge events during monsoon
 */
export const getTimeSeriesData = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return [];

  const data = [];
  const now = new Date();
  const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);
  
  // Base water level (meters below ground level)
  const baseLevel = station.currentWaterLevel || 15;
  const maxDepth = station.depth || 50;
  
  // Generate hourly data points
  for (let time = twoYearsAgo; time <= now; time = new Date(time.getTime() + 60 * 60 * 1000)) {
    const dayOfYear = getDayOfYear(time);
    const month = time.getMonth();
    
    // Seasonal variation
    // Summer (Mar-May): Lower water levels
    // Monsoon (Jun-Sep): Rising water levels
    // Post-Monsoon (Oct-Nov): Peak levels
    // Winter (Dec-Feb): Gradual decline
    let seasonalEffect = 0;
    
    if (month >= 2 && month <= 4) { // Mar-May (Summer)
      seasonalEffect = 5 + Math.sin((dayOfYear - 60) / 30) * 3; // Higher values = deeper (less water)
    } else if (month >= 5 && month <= 8) { // Jun-Sep (Monsoon)
      seasonalEffect = -2 - Math.sin((dayOfYear - 150) / 40) * 4; // Negative = shallower (more water)
    } else if (month >= 9 && month <= 10) { // Oct-Nov (Post-Monsoon)
      seasonalEffect = -5 - Math.sin((dayOfYear - 270) / 20) * 2;
    } else { // Dec-Feb (Winter)
      seasonalEffect = Math.sin((dayOfYear + 30) / 30) * 2;
    }
    
    // Daily variation (small fluctuations)
    const hourOfDay = time.getHours();
    const dailyEffect = Math.sin(hourOfDay / 24 * 2 * Math.PI) * 0.3;
    
    // Random noise
    const noise = (Math.random() - 0.5) * 0.5;
    
    // Long-term trend (slight decline over 2 years due to over-extraction)
    const yearProgress = (time - twoYearsAgo) / (2 * 365 * 24 * 60 * 60 * 1000);
    const longTermTrend = yearProgress * 2; // 2 meters decline over 2 years
    
    // Calculate water level
    const waterLevel = Math.max(
      2, // Minimum 2 meters below ground
      Math.min(
        maxDepth - 5, // At least 5 meters from bottom
        baseLevel + seasonalEffect + dailyEffect + noise + longTermTrend
      )
    );
    
    // Calculate recharge rate (positive during monsoon, negative otherwise)
    let rechargeRate = 0;
    if (month >= 5 && month <= 8) {
      // Monsoon: positive recharge
      rechargeRate = 0.02 + Math.random() * 0.08; // 0.02 to 0.10 m/day
    } else if (month >= 2 && month <= 4) {
      // Summer: negative (depletion)
      rechargeRate = -0.01 - Math.random() * 0.04; // -0.01 to -0.05 m/day
    } else {
      // Other months: minimal change
      rechargeRate = (Math.random() - 0.5) * 0.02; // -0.01 to +0.01 m/day
    }
    
    data.push({
      timestamp: time.toISOString(),
      waterLevel: parseFloat(waterLevel.toFixed(2)),
      rechargeRate: parseFloat(rechargeRate.toFixed(4)),
      temperature: 15 + Math.sin((dayOfYear / 365) * 2 * Math.PI) * 10 + Math.random() * 5, // 10-30°C
      rainfall: month >= 5 && month <= 8 ? Math.random() * 50 : Math.random() * 5, // mm
    });
  }
  
  return data;
};

/**
 * Get recent data (last 30 days) for quick loading
 */
export const getRecentTimeSeriesData = (stationId, days = 30) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return [];

  const data = [];
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  const baseLevel = station.currentWaterLevel || 15;
  
  // Generate daily data points for recent period
  for (let time = startDate; time <= now; time = new Date(time.getTime() + 24 * 60 * 60 * 1000)) {
    const month = time.getMonth();
    
    let seasonalEffect = 0;
    if (month >= 2 && month <= 4) {
      seasonalEffect = 3;
    } else if (month >= 5 && month <= 8) {
      seasonalEffect = -3;
    } else if (month >= 9 && month <= 10) {
      seasonalEffect = -4;
    }
    
    const noise = (Math.random() - 0.5) * 0.8;
    const waterLevel = Math.max(2, baseLevel + seasonalEffect + noise);
    
    let rechargeRate = 0;
    if (month >= 5 && month <= 8) {
      rechargeRate = 0.03 + Math.random() * 0.07;
    } else if (month >= 2 && month <= 4) {
      rechargeRate = -0.02 - Math.random() * 0.03;
    } else {
      rechargeRate = (Math.random() - 0.5) * 0.02;
    }
    
    data.push({
      timestamp: time.toISOString(),
      waterLevel: parseFloat(waterLevel.toFixed(2)),
      rechargeRate: parseFloat(rechargeRate.toFixed(4)),
    });
  }
  
  return data;
};

/**
 * Get aggregated monthly data for 2 years
 */
export const getMonthlyAggregateData = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return [];

  const data = [];
  const now = new Date();
  const baseLevel = station.currentWaterLevel || 15;
  
  for (let i = 24; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth();
    
    let avgLevel = baseLevel;
    if (month >= 2 && month <= 4) {
      avgLevel += 4;
    } else if (month >= 5 && month <= 8) {
      avgLevel -= 3;
    } else if (month >= 9 && month <= 10) {
      avgLevel -= 4;
    }
    
    data.push({
      month: date.toISOString().substring(0, 7), // YYYY-MM
      avgWaterLevel: parseFloat(avgLevel.toFixed(2)),
      minWaterLevel: parseFloat((avgLevel - 2).toFixed(2)),
      maxWaterLevel: parseFloat((avgLevel + 2).toFixed(2)),
    });
  }
  
  return data;
};

// Helper function to get day of year
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default getTimeSeriesData;
