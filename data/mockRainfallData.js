// data/mockRainfallData.js
// Generate mock rainfall data for districts

/**
 * Get daily rainfall data for a district
 * Simulates monsoon patterns in India
 */
export const getRainfallData = (district, days = 365) => {
  const data = [];
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  for (let time = startDate; time <= now; time = new Date(time.getTime() + 24 * 60 * 60 * 1000)) {
    const month = time.getMonth();
    let rainfall = 0;
    
    // Monsoon months (June-September) have higher rainfall
    if (month >= 5 && month <= 8) {
      // Monsoon season
      const intensity = Math.random();
      if (intensity > 0.7) {
        // Heavy rain day (30%)
        rainfall = 20 + Math.random() * 80; // 20-100mm
      } else if (intensity > 0.3) {
        // Moderate rain day (40%)
        rainfall = 5 + Math.random() * 20; // 5-25mm
      } else {
        // Light or no rain (30%)
        rainfall = Math.random() * 5; // 0-5mm
      }
    } else if (month >= 9 && month <= 10) {
      // Post-monsoon (October-November)
      if (Math.random() > 0.7) {
        rainfall = Math.random() * 30; // 0-30mm
      } else {
        rainfall = Math.random() * 5;
      }
    } else {
      // Dry season (December-May)
      if (Math.random() > 0.9) {
        rainfall = Math.random() * 10; // Occasional rain
      } else {
        rainfall = 0;
      }
    }
    
    data.push({
      date: time.toISOString().substring(0, 10),
      rainfall: parseFloat(rainfall.toFixed(2)),
      month: time.getMonth(),
      year: time.getFullYear(),
    });
  }
  
  return data;
};

/**
 * Get monthly rainfall aggregates
 */
export const getMonthlyRainfallData = (district, months = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth();
    
    let avgRainfall = 0;
    
    if (month >= 5 && month <= 8) {
      // Monsoon months
      avgRainfall = 150 + Math.random() * 200; // 150-350mm
    } else if (month >= 9 && month <= 10) {
      // Post-monsoon
      avgRainfall = 50 + Math.random() * 100; // 50-150mm
    } else {
      // Dry season
      avgRainfall = Math.random() * 30; // 0-30mm
    }
    
    data.push({
      month: date.toISOString().substring(0, 7),
      totalRainfall: parseFloat(avgRainfall.toFixed(2)),
      avgDailyRainfall: parseFloat((avgRainfall / 30).toFixed(2)),
      rainyDays: Math.floor(avgRainfall / 10),
    });
  }
  
  return data;
};

/**
 * Get current monsoon status
 */
export const getMonsoonStatus = () => {
  const now = new Date();
  const month = now.getMonth();
  
  if (month >= 5 && month <= 8) {
    return {
      status: 'active',
      phase: 'Southwest Monsoon',
      progress: Math.floor(((month - 5) / 4) * 100),
      expectedEndDate: new Date(now.getFullYear(), 8, 30).toISOString(),
      currentIntensity: 'moderate',
    };
  } else if (month >= 9 && month <= 10) {
    return {
      status: 'retreating',
      phase: 'Post-Monsoon',
      progress: Math.floor(((month - 9) / 2) * 100),
      expectedEndDate: new Date(now.getFullYear(), 10, 30).toISOString(),
      currentIntensity: 'low',
    };
  } else {
    return {
      status: 'inactive',
      phase: 'Dry Season',
      progress: 0,
      expectedStartDate: new Date(now.getFullYear() + (month >= 11 ? 1 : 0), 5, 1).toISOString(),
      currentIntensity: 'none',
    };
  }
};

/**
 * Get rainfall forecast (mock 7-day forecast)
 */
export const getRainfallForecast = (district) => {
  const forecast = [];
  const now = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const month = date.getMonth();
    
    let probability = 0;
    let expectedAmount = 0;
    
    if (month >= 5 && month <= 8) {
      probability = 30 + Math.random() * 50; // 30-80%
      expectedAmount = Math.random() * 40;
    } else if (month >= 9 && month <= 10) {
      probability = 10 + Math.random() * 30; // 10-40%
      expectedAmount = Math.random() * 20;
    } else {
      probability = Math.random() * 20; // 0-20%
      expectedAmount = Math.random() * 5;
    }
    
    forecast.push({
      date: date.toISOString().substring(0, 10),
      probability: Math.floor(probability),
      expectedAmount: parseFloat(expectedAmount.toFixed(2)),
      intensity: expectedAmount > 20 ? 'heavy' : expectedAmount > 10 ? 'moderate' : 'light',
    });
  }
  
  return forecast;
};

/**
 * Get annual rainfall comparison
 */
export const getAnnualRainfallComparison = (district) => {
  const data = [];
  const currentYear = new Date().getFullYear();
  
  for (let year = currentYear - 5; year <= currentYear; year++) {
    let annualTotal = 0;
    
    // Summer months (Mar-May)
    annualTotal += 20 + Math.random() * 50;
    
    // Monsoon months (Jun-Sep)
    annualTotal += 600 + Math.random() * 400;
    
    // Post-monsoon (Oct-Nov)
    annualTotal += 100 + Math.random() * 150;
    
    // Winter months (Dec-Feb)
    annualTotal += 10 + Math.random() * 30;
    
    data.push({
      year,
      totalRainfall: parseFloat(annualTotal.toFixed(2)),
      normalRainfall: 850, // Average normal rainfall
      deviation: parseFloat(((annualTotal - 850) / 850 * 100).toFixed(2)),
    });
  }
  
  return data;
};

export default getRainfallData;
