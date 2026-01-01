import { mockStations } from './mockStations';

export const getTimeSeriesData = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return [];

  const data = [];
  const now = new Date();
  const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);
  
  const baseLevel = station.currentWaterLevel || 15;
  const maxDepth = station.depth || 50;
  
  for (let time = twoYearsAgo; time <= now; time = new Date(time.getTime() + 60 * 60 * 1000)) {
    const dayOfYear = getDayOfYear(time);
    const month = time.getMonth();
    
    let seasonalEffect = 0;
    
    if (month >= 2 && month <= 4) {
      seasonalEffect = 5 + Math.sin((dayOfYear - 60) / 30) * 3;
    } else if (month >= 5 && month <= 8) {
      seasonalEffect = -2 - Math.sin((dayOfYear - 150) / 40) * 4;
    } else if (month >= 9 && month <= 10) {
      seasonalEffect = -5 - Math.sin((dayOfYear - 270) / 20) * 2;
    } else {
      seasonalEffect = Math.sin((dayOfYear + 30) / 30) * 2;
    }
    
    const hourOfDay = time.getHours();
    const dailyEffect = Math.sin(hourOfDay / 24 * 2 * Math.PI) * 0.3;
    
    const noise = (Math.random() - 0.5) * 0.5;
    
    const yearProgress = (time - twoYearsAgo) / (2 * 365 * 24 * 60 * 60 * 1000);
    const longTermTrend = yearProgress * 2;
    
    const waterLevel = Math.max(
      2,
      Math.min(
        maxDepth - 5,
        baseLevel + seasonalEffect + dailyEffect + noise + longTermTrend
      )
    );
    
    let rechargeRate = 0;
    if (month >= 5 && month <= 8) {
      rechargeRate = 0.02 + Math.random() * 0.08;
    } else if (month >= 2 && month <= 4) {
      rechargeRate = -0.01 - Math.random() * 0.04;
    } else {
      rechargeRate = (Math.random() - 0.5) * 0.02;
    }
    
    data.push({
      timestamp: time.toISOString(),
      waterLevel: parseFloat(waterLevel.toFixed(2)),
      rechargeRate: parseFloat(rechargeRate.toFixed(4)),
      temperature: 15 + Math.sin((dayOfYear / 365) * 2 * Math.PI) * 10 + Math.random() * 5,
      rainfall: month >= 5 && month <= 8 ? Math.random() * 50 : Math.random() * 5,
    });
  }
  
  return data;
};

export const getRecentTimeSeriesData = (stationId, days = 30) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return [];

  const data = [];
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  const baseLevel = station.currentWaterLevel || 15;
  
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
      month: date.toISOString().substring(0, 7),
      avgWaterLevel: parseFloat(avgLevel.toFixed(2)),
      minWaterLevel: parseFloat((avgLevel - 2).toFixed(2)),
      maxWaterLevel: parseFloat((avgLevel + 2).toFixed(2)),
    });
  }
  
  return data;
};

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default getTimeSeriesData;
