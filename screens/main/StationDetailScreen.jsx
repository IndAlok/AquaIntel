// Detailed view of a single DWLR station with charts and analytics

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Text, useTheme, Card, Chip, Divider, List, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WaterLevelChart from '../../components/WaterLevelChart';
import GaugeIndicator from '../../components/GaugeIndicator';
import DataCard from '../../components/DataCard';
import dataService from '../../services/dataService';
import DataSourceBadge from '../../components/DataSourceBadge';
import { useAppTheme } from '../../store/ThemeContext';

const StationDetailScreen = ({ route }) => {
  const theme = useTheme();
  const { colors } = useAppTheme();
  const { stationId } = route.params;
  const [station, setStation] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [rainfallData, setRainfallData] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [aiInsights, setAIInsights] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStationData();
  }, [stationId, timeRange]);

  const loadStationData = async () => {
    setLoading(true);
    try {
      const stations = await dataService.getStations();
      const stationData = stations.find((s) => s.id === stationId);
      setStation(stationData);

      if (stationData) {
        const days = timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
        setTimeSeriesData(await dataService.getWaterLevelData(stationId, days));
        const currentYear = new Date().getFullYear();
        setRainfallData(
          await dataService.getRainfallData(stationData.state, stationData.district, currentYear)
        );
        setRiskAssessment(await dataService.getRiskAssessment(stationId));
        setAIInsights(await dataService.getAIInsights(stationId));
      }
    } catch (error) {
      // Silently handle error
    } finally {
      setLoading(false);
    }
  };

  if (loading || !station) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.onSurface, marginTop: 16 }}>Loading station data...</Text>
      </View>
    );
  }

  const utilizationRate = (station.currentWaterLevel / station.depth) * 100;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}>
        <DataSourceBadge />
      </View>
      {/* Station Header */}
      <Card style={[styles.headerCard, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text
                variant="headlineSmall"
                style={[styles.stationName, { color: colors.onSurface }]}
              >
                {station.name}
              </Text>
              <Text
                variant="bodyMedium"
                style={[styles.stationLocation, { color: colors.onSurfaceVariant }]}
              >
                {station.district}, {station.state}
              </Text>
              <Text
                variant="bodySmall"
                style={[styles.stationId, { color: colors.onSurfaceVariant }]}
              >
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
                      ? '#4CAF5020'
                      : station.status === 'Inactive'
                        ? '#F4433620'
                        : '#FFA72620',
                },
              ]}
              textStyle={{
                color:
                  station.status === 'Active'
                    ? '#4CAF50'
                    : station.status === 'Inactive'
                      ? '#F44336'
                      : '#FFA726',
              }}
            >
              {station.status}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Current Status Gauge */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <GaugeIndicator
            value={station.currentWaterLevel}
            maxValue={station.depth}
            title="Current Water Level"
            unit="meters below ground"
          />
          <Text
            variant="bodySmall"
            style={[styles.lastUpdated, { color: colors.onSurfaceVariant }]}
          >
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
          iconColor={colors.primary}
        />
        <DataCard
          title="Aquifer Type"
          value={station.aquiferType}
          icon="layers-triple"
          iconColor={colors.onSurfaceVariant}
        />
      </View>

      {/* AI Insights & Alerts */}
      {aiInsights && aiInsights.alerts && aiInsights.alerts.length > 0 && (
        <Card style={[styles.card, styles.alertCard, { backgroundColor: colors.surface }]}>
          <Card.Content>
            <View style={styles.alertHeader}>
              <MaterialCommunityIcons name="alert" size={24} color="#F44336" />
              <Text variant="titleMedium" style={[styles.alertTitle, { color: '#F44336' }]}>
                Active Alerts
              </Text>
            </View>
            {aiInsights.alerts.map((alert, index) => (
              <View key={index} style={styles.alertItem}>
                <Text
                  variant="bodyMedium"
                  style={[styles.alertMessage, { color: colors.onSurface }]}
                >
                  {alert.message}
                </Text>
                <Text
                  variant="bodySmall"
                  style={[styles.alertAction, { color: colors.onSurfaceVariant }]}
                >
                  Action: {alert.action}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Time Series Chart */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.chartTitle, { color: colors.onSurface }]}>
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
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <Card.Content>
            <View style={styles.riskHeader}>
              <Text
                variant="titleMedium"
                style={[styles.sectionTitle, { color: colors.onSurface }]}
              >
                Risk Assessment
              </Text>
              <Chip
                style={{
                  backgroundColor:
                    riskAssessment.riskLevel === 'critical'
                      ? '#F4433620'
                      : riskAssessment.riskLevel === 'high'
                        ? '#FFA72620'
                        : riskAssessment.riskLevel === 'moderate'
                          ? '#FFC10720'
                          : '#4CAF5020',
                }}
              >
                {riskAssessment.riskLevel.toUpperCase()}
              </Chip>
            </View>
            <Text variant="bodyMedium" style={[styles.riskScore, { color: colors.onSurface }]}>
              Risk Score: {riskAssessment.riskScore}/100
            </Text>
            <Divider style={styles.divider} />
            <Text
              variant="titleSmall"
              style={[styles.subsectionTitle, { color: colors.onSurface }]}
            >
              Contributing Factors
            </Text>
            {riskAssessment.factors.map((factor, index) => (
              <List.Item
                key={index}
                title={factor.factor}
                description={factor.description}
                titleStyle={{ color: colors.onSurface }}
                descriptionStyle={{ color: colors.onSurfaceVariant }}
                left={(props) => (
                  <MaterialCommunityIcons
                    name="circle-medium"
                    size={24}
                    color={
                      factor.impact === 'high'
                        ? '#F44336'
                        : factor.impact === 'moderate'
                          ? '#FFA726'
                          : '#4CAF50'
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
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Recommendations
            </Text>
            {riskAssessment.recommendations.map((rec, index) => (
              <List.Item
                key={index}
                title={rec}
                titleStyle={{ color: colors.onSurface }}
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
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <Card.Content>
            <View style={styles.aiHeader}>
              <MaterialCommunityIcons name="brain" size={24} color={colors.primary} />
              <Text variant="titleMedium" style={[styles.aiTitle, { color: colors.onSurface }]}>
                AI Insights
              </Text>
            </View>
            {aiInsights.insights.map((insight, index) => (
              <Card
                key={index}
                style={[styles.insightCard, { backgroundColor: colors.surfaceVariant }]}
              >
                <Card.Content>
                  <Text
                    variant="labelSmall"
                    style={[styles.insightType, { color: colors.onSurfaceVariant }]}
                  >
                    {insight.type.toUpperCase()}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={[styles.insightMessage, { color: colors.onSurface }]}
                  >
                    {insight.message}
                  </Text>
                  <Text
                    variant="bodySmall"
                    style={[styles.insightImpact, { color: colors.onSurfaceVariant }]}
                  >
                    Impact: {insight.impact}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Station Details */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.onSurface }]}>
            Station Information
          </Text>
          <List.Item
            title="Installation Date"
            description={new Date(station.installationDate).toLocaleDateString()}
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={(props) => (
              <MaterialCommunityIcons name="calendar" size={24} color={colors.onSurfaceVariant} />
            )}
          />
          <List.Item
            title="Coordinates"
            description={`${station.latitude.toFixed(4)}, ${station.longitude.toFixed(4)}`}
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={(props) => (
              <MaterialCommunityIcons name="map-marker" size={24} color={colors.onSurfaceVariant} />
            )}
          />
          <List.Item
            title="Aquifer Type"
            description={station.aquiferType}
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={(props) => (
              <MaterialCommunityIcons name="layers" size={24} color={colors.onSurfaceVariant} />
            )}
          />
          <List.Item
            title="Station Depth"
            description={`${station.depth} meters`}
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={(props) => (
              <MaterialCommunityIcons
                name="arrow-down-thick"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  insightType: {
    marginBottom: 4,
  },
  insightMessage: {
    marginBottom: 4,
  },
  insightImpact: {},
});

export default StationDetailScreen;
