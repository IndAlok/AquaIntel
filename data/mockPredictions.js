import { mockStations } from './mockStations';

export const getPredictions = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return null;

  const predictions = [];
  const now = new Date();
  const currentLevel = station.currentWaterLevel;
  
  for (let i = 1; i <= 180; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const month = date.getMonth();
    
    let seasonalEffect = 0;
    if (month >= 2 && month <= 4) {
      seasonalEffect = 2 + (i / 180) * 3;
    } else if (month >= 5 && month <= 8) {
      seasonalEffect = -1 - (i / 180) * 2;
    } else if (month >= 9 && month <= 10) {
      seasonalEffect = -3;
    } else {
      seasonalEffect = 1;
    }
    
    const depletionTrend = (i / 365) * 1.5;
    
    const uncertainty = (i / 180) * 2;
    
    const predictedLevel = currentLevel + seasonalEffect + depletionTrend;
    
    predictions.push({
      date: date.toISOString().substring(0, 10),
      predictedLevel: parseFloat(predictedLevel.toFixed(2)),
      lowerBound: parseFloat((predictedLevel - uncertainty).toFixed(2)),
      upperBound: parseFloat((predictedLevel + uncertainty).toFixed(2)),
      confidence: parseFloat((100 - (i / 180) * 30).toFixed(2)),
    });
  }
  
  return predictions;
};

export const getMonthlyPredictions = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return null;

  const predictions = [];
  const now = new Date();
  const currentLevel = station.currentWaterLevel;
  
  for (let i = 1; i <= 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const month = date.getMonth();
    
    let avgLevel = currentLevel;
    if (month >= 2 && month <= 4) {
      avgLevel += 3;
    } else if (month >= 5 && month <= 8) {
      avgLevel -= 2;
    } else if (month >= 9 && month <= 10) {
      avgLevel -= 3;
    } else {
      avgLevel += 1;
    }
    
    avgLevel += (i / 12) * 1.5;
    
    predictions.push({
      month: date.toISOString().substring(0, 7),
      avgPredictedLevel: parseFloat(avgLevel.toFixed(2)),
      trend: avgLevel > currentLevel ? 'declining' : 'improving',
      riskLevel: avgLevel > station.depth * 0.8 ? 'critical' : avgLevel > station.depth * 0.6 ? 'warning' : 'safe',
    });
  }
  
  return predictions;
};

export const getRiskAssessment = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return null;

  const currentLevel = station.currentWaterLevel;
  const depth = station.depth;
  const utilizationRate = (currentLevel / depth) * 100;
  
  let riskLevel = 'low';
  let riskScore = 0;
  
  if (utilizationRate > 80) {
    riskLevel = 'critical';
    riskScore = 85 + Math.random() * 15;
  } else if (utilizationRate > 60) {
    riskLevel = 'high';
    riskScore = 60 + Math.random() * 25;
  } else if (utilizationRate > 40) {
    riskLevel = 'moderate';
    riskScore = 40 + Math.random() * 20;
  } else {
    riskLevel = 'low';
    riskScore = Math.random() * 40;
  }
  
  return {
    stationId,
    riskLevel,
    riskScore: parseFloat(riskScore.toFixed(2)),
    utilizationRate: parseFloat(utilizationRate.toFixed(2)),
    factors: [
      {
        factor: 'Current Water Level',
        impact: utilizationRate > 60 ? 'high' : 'moderate',
        description: `Water level at ${currentLevel.toFixed(2)}m (${utilizationRate.toFixed(1)}% of depth)`,
      },
      {
        factor: 'Seasonal Trend',
        impact: 'moderate',
        description: 'Expected seasonal variation based on monsoon patterns',
      },
      {
        factor: 'Long-term Depletion',
        impact: 'high',
        description: 'Gradual depletion trend observed over past 2 years',
      },
      {
        factor: 'Recharge Potential',
        impact: station.aquiferType === 'Alluvial' ? 'positive' : 'moderate',
        description: `${station.aquiferType} aquifer type affects recharge capacity`,
      },
    ],
    recommendations: generateRecommendations(riskLevel, station),
  };
};

const generateRecommendations = (riskLevel, station) => {
  const recommendations = [];
  
  if (riskLevel === 'critical') {
    recommendations.push(
      'Immediate intervention required - Consider water usage restrictions',
      'Implement artificial recharge structures (percolation tanks, check dams)',
      'Monitor water extraction rates and enforce limits',
      'Conduct detailed aquifer study'
    );
  } else if (riskLevel === 'high') {
    recommendations.push(
      'Enhance monitoring frequency',
      'Promote water conservation measures',
      'Plan for artificial recharge before monsoon',
      'Awareness campaigns for sustainable usage'
    );
  } else if (riskLevel === 'moderate') {
    recommendations.push(
      'Continue regular monitoring',
      'Maintain existing recharge structures',
      'Encourage rainwater harvesting',
      'Plan for contingency measures'
    );
  } else {
    recommendations.push(
      'Maintain current conservation practices',
      'Regular maintenance of monitoring equipment',
      'Document best practices for replication',
      'Community engagement programs'
    );
  }
  
  return recommendations;
};

export const getComparativeAnalysis = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return null;

  const nearbyStations = mockStations
    .filter(s => s.district === station.district && s.id !== stationId && s.status === 'Active')
    .slice(0, 5);
  
  const comparison = nearbyStations.map(s => ({
    stationId: s.id,
    stationName: s.name,
    distance: (Math.random() * 20 + 5).toFixed(2),
    waterLevel: s.currentWaterLevel,
    difference: parseFloat((s.currentWaterLevel - station.currentWaterLevel).toFixed(2)),
    status: s.status,
  }));
  
  const avgNearbyLevel = comparison.reduce((sum, s) => sum + s.waterLevel, 0) / comparison.length;
  
  return {
    stationId,
    currentLevel: station.currentWaterLevel,
    averageNearbyLevel: parseFloat(avgNearbyLevel.toFixed(2)),
    variance: parseFloat((station.currentWaterLevel - avgNearbyLevel).toFixed(2)),
    interpretation: Math.abs(station.currentWaterLevel - avgNearbyLevel) > 3 
      ? 'Significant deviation from nearby stations - requires investigation'
      : 'Consistent with nearby stations',
    nearbyStations: comparison,
  };
};

export const getAIInsights = (stationId) => {
  const station = mockStations.find(s => s.id === stationId);
  if (!station) return null;

  const insights = [];
  const alerts = [];
  
  const currentLevel = station.currentWaterLevel;
  const month = new Date().getMonth();
  
  if (currentLevel > station.depth * 0.7) {
    alerts.push({
      severity: 'high',
      type: 'depletion',
      message: `Water level critically low at ${currentLevel.toFixed(2)}m`,
      action: 'Immediate assessment required',
    });
  }
  
  if (month >= 2 && month <= 4) {
    insights.push({
      type: 'seasonal',
      message: 'Summer season: Expected further depletion before monsoon',
      impact: 'Water levels may drop 2-3m in next 60 days',
    });
  } else if (month >= 5 && month <= 8) {
    insights.push({
      type: 'seasonal',
      message: 'Monsoon season: Expect recharge and level improvement',
      impact: 'Water levels may rise 3-5m during monsoon',
    });
  }
  
  if (station.aquiferType === 'Hard Rock') {
    insights.push({
      type: 'geological',
      message: 'Hard rock aquifer: Limited storage capacity',
      impact: 'Faster depletion and slower recharge compared to alluvial aquifers',
    });
  }
  
  return {
    stationId,
    insights,
    alerts,
    lastAnalyzed: new Date().toISOString(),
    confidenceScore: 85 + Math.random() * 10,
  };
};

export default getPredictions;
