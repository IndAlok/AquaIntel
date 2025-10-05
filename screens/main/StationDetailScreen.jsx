// screens/main/StationDetailScreen.jsx
// Detailed view of a single DWLR station with charts and analytics

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, useTheme, Card, Chip, Divider, List, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WaterLevelChart from '../../components/WaterLevelChart';
import GaugeIndicator from '../../components/GaugeIndicator';
import DataCard from '../../components/DataCard';
import { getStationById } from '../../data/mockStations';
import { getRecentTimeSeriesData, getMonthlyAggregateData } from '../../data/mockTimeSeriesData';
import { getRainfallData } from '../../data/mockRainfallData';
import { getRiskAssessment, getAIInsights } from '../../data/mockPredictions';

const StationDetailScreen = ({ route }) => {
  const theme = useTheme();
  const { stationId } = route.params;
  const [station, setStation] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [rainfallData, setRainfallData] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [aiInsights, setAIInsights] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadStationData();
  }, [stationId, timeRange]);

  const loadStationData = () => {
    const stationData = getStationById(stationId);
    setStation(stationData);

    if (stationData) {
      // Load different time ranges
      if (timeRange === '30d') {
        setTimeSeriesData(getRecentTimeSeriesData(stationId, 30));
      } else if (timeRange === '90d') {
        setTimeSeriesData(getRecentTimeSeriesData(stationId, 90));
      } else {
        setTimeSeriesData(getMonthlyAggregateData(stationId));
      }

      setRainfallData(getRainfallData(stationData.district, 30));
      setRiskAssessment(getRiskAssessment(stationId));
      setAIInsights(getAIInsights(stationId));
    }
  };

  if (!station) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading station data...</Text>
      </View>
    );
  }

  const utilizationRate = (station.currentWaterLevel / station.depth) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Station Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text variant="headlineSmall" style={styles.stationName}>
                {station.name}
              </Text>
              <Text variant="bodyMedium" style={styles.stationLocation}>
                {station.district}, {station.state}
              </Text>
              <Text variant="bodySmall" style={styles.stationId}>
                ID: {station.id}
              </Text>
            </View>
            <Chip
              icon={station.status === 'Active' ? 'check-circle' : 'close-circle'}
              style={[
                styles.statusChip,
                {
                  backgroundColor:
                    station.status === 'Active'
                      ? theme.colors.success + '20'
                      : station.status === 'Inactive'
                      ? theme.colors.error + '20'
                      : '#FFA726' + '20',
                },
              ]}
            >
              {station.status}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Current Status Gauge */}
      <Card style={styles.card}>
        <Card.Content>
          <GaugeIndicator
            value={station.currentWaterLevel}
            maxValue={station.depth}
            title="Current Water Level"
            unit="meters below ground"
          />
          <Text variant="bodySmall" style={styles.lastUpdated}>
            Last updated: {new Date(station.lastUpdated).toLocaleString()}
          </Text>
        </Card.Content>
      </Card>

      {/* Key Metrics */}
      <View style={styles.metricsGrid}>
        <DataCard
          title="Total Depth"
          value={station.depth}
          unit="m"
          icon="arrow-down"
          iconColor={theme.colors.primary}
        />
        <DataCard
          title="Aquifer Type"
          value={station.aquiferType}
          icon="layers-triple"
          iconColor="#666"
        />
      </View>

      {/* AI Insights & Alerts */}
      {aiInsights && aiInsights.alerts && aiInsights.alerts.length > 0 && (
        <Card style={[styles.card, styles.alertCard]}>
          <Card.Content>
            <View style={styles.alertHeader}>
              <MaterialCommunityIcons name="alert" size={24} color={theme.colors.error} />
              <Text variant="titleMedium" style={[styles.alertTitle, { color: theme.colors.error }]}>
                Active Alerts
              </Text>
            </View>
            {aiInsights.alerts.map((alert, index) => (
              <View key={index} style={styles.alertItem}>
                <Text variant="bodyMedium" style={styles.alertMessage}>
                  {alert.message}
                </Text>
                <Text variant="bodySmall" style={styles.alertAction}>
                  Action: {alert.action}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Time Series Chart */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>
            Water Level Trend
          </Text>
          <SegmentedButtons
            value={timeRange}
            onValueChange={setTimeRange}
            buttons={[
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' },
              { value: '1y', label: '1 Year' },
            ]}
            style={styles.timeRangeButtons}
          />
          <WaterLevelChart data={timeSeriesData} />
        </Card.Content>
      </Card>

      {/* Risk Assessment */}
      {riskAssessment && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.riskHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Risk Assessment
              </Text>
              <Chip
                style={{
                  backgroundColor:
                    riskAssessment.riskLevel === 'critical'
                      ? theme.colors.error + '20'
                      : riskAssessment.riskLevel === 'high'
                      ? '#FFA726' + '20'
                      : riskAssessment.riskLevel === 'moderate'
                      ? '#FFC107' + '20'
                      : theme.colors.success + '20',
                }}
              >
                {riskAssessment.riskLevel.toUpperCase()}
              </Chip>
            </View>
            <Text variant="bodyMedium" style={styles.riskScore}>
              Risk Score: {riskAssessment.riskScore}/100
            </Text>
            <Divider style={styles.divider} />
            <Text variant="titleSmall" style={styles.subsectionTitle}>
              Contributing Factors
            </Text>
            {riskAssessment.factors.map((factor, index) => (
              <List.Item
                key={index}
                title={factor.factor}
                description={factor.description}
                left={(props) => (
                  <MaterialCommunityIcons
                    name="circle-medium"
                    size={24}
                    color={
                      factor.impact === 'high'
                        ? theme.colors.error
                        : factor.impact === 'moderate'
                        ? '#FFA726'
                        : theme.colors.success
                    }
                  />
                )}
              />
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Recommendations */}
      {riskAssessment && riskAssessment.recommendations && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Recommendations
            </Text>
            {riskAssessment.recommendations.map((rec, index) => (
              <List.Item
                key={index}
                title={rec}
                left={(props) => (
                  <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFA726" />
                )}
                titleNumberOfLines={3}
              />
            ))}
          </Card.Content>
        </Card>
      )}

      {/* AI Insights */}
      {aiInsights && aiInsights.insights && aiInsights.insights.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.aiHeader}>
              <MaterialCommunityIcons name="brain" size={24} color={theme.colors.primary} />
              <Text variant="titleMedium" style={styles.aiTitle}>
                AI Insights
              </Text>
            </View>
            {aiInsights.insights.map((insight, index) => (
              <Card key={index} style={styles.insightCard}>
                <Card.Content>
                  <Text variant="labelSmall" style={styles.insightType}>
                    {insight.type.toUpperCase()}
                  </Text>
                  <Text variant="bodyMedium" style={styles.insightMessage}>
                    {insight.message}
                  </Text>
                  <Text variant="bodySmall" style={styles.insightImpact}>
                    Impact: {insight.impact}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Station Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Station Information
          </Text>
          <List.Item
            title="Installation Date"
            description={new Date(station.installationDate).toLocaleDateString()}
            left={(props) => <MaterialCommunityIcons name="calendar" size={24} />}
          />
          <List.Item
            title="Coordinates"
            description={`${station.latitude.toFixed(4)}, ${station.longitude.toFixed(4)}`}
            left={(props) => <MaterialCommunityIcons name="map-marker" size={24} />}
          />
          <List.Item
            title="Aquifer Type"
            description={station.aquiferType}
            left={(props) => <MaterialCommunityIcons name="layers" size={24} />}
          />
          <List.Item
            title="Station Depth"
            description={`${station.depth} meters`}
            left={(props) => <MaterialCommunityIcons name="arrow-down-thick" size={24} />}
          />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stationName: {
    fontWeight: 'bold',
  },
  stationLocation: {
    marginTop: 4,
    opacity: 0.7,
  },
  stationId: {
    marginTop: 4,
    opacity: 0.5,
  },
  statusChip: {
    marginLeft: 8,
  },
  card: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  lastUpdated: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
  metricsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  alertCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  alertItem: {
    marginBottom: 12,
  },
  alertMessage: {
    fontWeight: '600',
  },
  alertAction: {
    marginTop: 4,
    opacity: 0.7,
  },
  chartTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  timeRangeButtons: {
    marginBottom: 16,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  riskScore: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  subsectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  insightCard: {
    marginBottom: 12,
    backgroundColor: '#F0F0F0',
  },
  insightType: {
    color: '#666',
    marginBottom: 4,
  },
  insightMessage: {
    marginBottom: 4,
  },
  insightImpact: {
    opacity: 0.7,
  },
});

export default StationDetailScreen;
