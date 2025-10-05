// screens/main/ForecastScreen.jsx
// Predictive analytics and forecasting screen

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, useTheme, SegmentedButtons, Searchbar, List, Chip } from 'react-native-paper';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, VictoryLegend, VictoryTheme, VictoryArea } from 'victory-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mockStations } from '../../data/mockStations';
import { getPredictions, getMonthlyPredictions } from '../../data/mockPredictions';

const { width } = Dimensions.get('window');

const ForecastScreen = () => {
  const theme = useTheme();
  const [selectedStation, setSelectedStation] = useState(mockStations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [monthlyPredictions, setMonthlyPredictions] = useState([]);
  const [timeHorizon, setTimeHorizon] = useState('30d');

  useEffect(() => {
    if (selectedStation) {
      loadPredictions();
    }
  }, [selectedStation, timeHorizon]);

  const loadPredictions = () => {
    const predData = getPredictions(selectedStation.id);
    const monthlyData = getMonthlyPredictions(selectedStation.id);
    
    // Filter based on time horizon
    let filtered = predData;
    if (timeHorizon === '30d') {
      filtered = predData.slice(0, 30);
    } else if (timeHorizon === '90d') {
      filtered = predData.slice(0, 90);
    }
    
    setPredictions(filtered);
    setMonthlyPredictions(monthlyData);
  };

  const getFilteredStations = () => {
    if (!searchQuery) return mockStations.slice(0, 20);
    return mockStations
      .filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 20);
  };

  // Prepare chart data
  const chartData = predictions.map((pred, index) => ({
    x: index,
    y: pred.predictedLevel,
    lower: pred.lowerBound,
    upper: pred.upperBound,
  }));

  return (
    <ScrollView style={styles.container}>
      {/* Station Selector */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Select Station
          </Text>
          <Searchbar
            placeholder="Search stations..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
          <ScrollView style={styles.stationList} nestedScrollEnabled>
            {getFilteredStations().map((station) => (
              <List.Item
                key={station.id}
                title={station.name}
                description={`${station.district}, ${station.state}`}
                left={(props) => (
                  <MaterialCommunityIcons
                    name="water"
                    size={24}
                    color={selectedStation?.id === station.id ? theme.colors.primary : '#999'}
                  />
                )}
                right={(props) =>
                  selectedStation?.id === station.id ? (
                    <MaterialCommunityIcons name="check" size={24} color={theme.colors.primary} />
                  ) : null
                }
                onPress={() => {
                  setSelectedStation(station);
                  setSearchQuery('');
                }}
                style={
                  selectedStation?.id === station.id
                    ? { backgroundColor: theme.colors.primary + '10' }
                    : {}
                }
              />
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      {/* Selected Station Info */}
      {selectedStation && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.stationHeader}>
              <View style={{ flex: 1 }}>
                <Text variant="titleLarge" style={styles.stationName}>
                  {selectedStation.name}
                </Text>
                <Text variant="bodyMedium" style={styles.stationLocation}>
                  {selectedStation.district}, {selectedStation.state}
                </Text>
              </View>
              <View style={styles.currentLevel}>
                <Text variant="labelSmall">Current Level</Text>
                <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                  {selectedStation.currentWaterLevel.toFixed(1)}m
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Time Horizon Selector */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Forecast Horizon
          </Text>
          <SegmentedButtons
            value={timeHorizon}
            onValueChange={setTimeHorizon}
            buttons={[
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' },
              { value: '180d', label: '6 Months' },
            ]}
          />
        </Card.Content>
      </Card>

      {/* Prediction Chart */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>
            Water Level Forecast
          </Text>
          <Text variant="bodySmall" style={styles.chartSubtitle}>
            Shaded area represents confidence interval
          </Text>
          <VictoryChart
            width={width - 64}
            height={300}
            theme={VictoryTheme.material}
            padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
          >
            <VictoryAxis
              style={{
                axis: { stroke: theme.colors.outline },
                tickLabels: { fill: theme.colors.onSurface, fontSize: 10 },
              }}
              tickFormat={(t) => {
                const daysPerTick = Math.ceil(predictions.length / 6);
                if (t % daysPerTick === 0) {
                  return `+${t}d`;
                }
                return '';
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: theme.colors.outline },
                tickLabels: { fill: theme.colors.onSurface, fontSize: 10 },
                grid: { stroke: theme.colors.surfaceVariant, strokeDasharray: '4,4' },
              }}
              label="Water Level (m)"
            />
            {/* Confidence interval */}
            <VictoryArea
              data={chartData}
              y={(d) => d.upper}
              y0={(d) => d.lower}
              style={{
                data: {
                  fill: theme.colors.primary,
                  fillOpacity: 0.2,
                },
              }}
            />
            {/* Prediction line */}
            <VictoryLine
              data={chartData}
              style={{
                data: { stroke: theme.colors.primary, strokeWidth: 2 },
              }}
              interpolation="natural"
            />
            {/* Current point */}
            <VictoryScatter
              data={[{ x: 0, y: selectedStation.currentWaterLevel }]}
              size={6}
              style={{ data: { fill: '#4CAF50' } }}
            />
          </VictoryChart>
        </Card.Content>
      </Card>

      {/* Monthly Predictions Summary */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Monthly Forecast Summary
          </Text>
          {monthlyPredictions.map((pred, index) => (
            <Card key={index} style={styles.monthCard}>
              <Card.Content>
                <View style={styles.monthHeader}>
                  <View style={{ flex: 1 }}>
                    <Text variant="labelSmall">
                      {new Date(pred.month).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                    <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                      {pred.avgPredictedLevel.toFixed(1)}m
                    </Text>
                  </View>
                  <View style={styles.trendContainer}>
                    <MaterialCommunityIcons
                      name={pred.trend === 'declining' ? 'trending-down' : 'trending-up'}
                      size={32}
                      color={pred.trend === 'declining' ? '#F44336' : '#4CAF50'}
                    />
                    <Text variant="bodySmall" style={styles.trendText}>
                      {pred.trend}
                    </Text>
                  </View>
                  <Chip
                    style={{
                      backgroundColor:
                        pred.riskLevel === 'critical'
                          ? '#F44336' + '20'
                          : pred.riskLevel === 'warning'
                          ? '#FFA726' + '20'
                          : '#4CAF50' + '20',
                    }}
                    textStyle={{
                      color:
                        pred.riskLevel === 'critical'
                          ? '#F44336'
                          : pred.riskLevel === 'warning'
                          ? '#FFA726'
                          : '#4CAF50',
                    }}
                  >
                    {pred.riskLevel}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          ))}
        </Card.Content>
      </Card>

      {/* Methodology */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.methodologyHeader}>
            <MaterialCommunityIcons name="brain" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.methodologyTitle}>
              Prediction Methodology
            </Text>
          </View>
          <Text variant="bodyMedium" style={styles.methodologyText}>
            Our AI-powered forecasting model uses:
          </Text>
          <List.Item
            title="Historical Trends"
            description="2+ years of water level data"
            left={(props) => <MaterialCommunityIcons name="chart-timeline-variant" size={24} />}
          />
          <List.Item
            title="Seasonal Patterns"
            description="Monsoon and drought cycles"
            left={(props) => <MaterialCommunityIcons name="weather-rainy" size={24} />}
          />
          <List.Item
            title="Rainfall Correlation"
            description="Local precipitation data"
            left={(props) => <MaterialCommunityIcons name="water" size={24} />}
          />
          <List.Item
            title="Machine Learning"
            description="Neural network predictions"
            left={(props) => <MaterialCommuniconsIcons name="brain" size={24} />}
          />
        </Card.Content>
      </Card>

      {/* Disclaimer */}
      <Card style={[styles.card, styles.disclaimerCard]}>
        <Card.Content>
          <Text variant="bodySmall" style={styles.disclaimer}>
            ⚠️ Disclaimer: These predictions are based on statistical models and historical data.
            Actual water levels may vary due to unforeseen events, policy changes, or extreme
            weather conditions. Always consult with local authorities for critical decisions.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchBar: {
    marginBottom: 12,
  },
  stationList: {
    maxHeight: 200,
  },
  stationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationName: {
    fontWeight: 'bold',
  },
  stationLocation: {
    marginTop: 4,
    opacity: 0.7,
  },
  currentLevel: {
    alignItems: 'flex-end',
  },
  chartTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chartSubtitle: {
    opacity: 0.7,
    marginBottom: 16,
  },
  monthCard: {
    marginBottom: 12,
    backgroundColor: '#F9F9F9',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  trendText: {
    marginTop: 4,
  },
  methodologyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodologyTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  methodologyText: {
    marginBottom: 12,
  },
  disclaimerCard: {
    backgroundColor: '#FFF3E0',
    marginBottom: 32,
  },
  disclaimer: {
    lineHeight: 20,
    color: '#666',
  },
});

export default ForecastScreen;
