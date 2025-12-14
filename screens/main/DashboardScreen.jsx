// Main dashboard with overview metrics and station list

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text, Searchbar, Chip, FAB, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import DataCard from '../../components/DataCard';
import DataSourceBadge from '../../components/DataSourceBadge';
import dataService from '../../services/dataService';
import { useAppTheme } from '../../store/ThemeContext';
import { useAuth } from '../../store/AuthContext';

const DashboardScreen = ({ navigation }) => {
  const { colors } = useAppTheme();
  const { firebaseDisabled } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [stations, setStations] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async (force = false) => {
    try {
      setLoading(true);
      setError('');
      const [fetchedStations, stats] = await Promise.all([
        dataService.getStations(force),
        dataService.getDashboardStats(),
      ]);
      setStations(fetchedStations);
      setMetrics(stats);
    } catch (e) {
      setError(e.message || 'Unable to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData(true).finally(() => setRefreshing(false));
  };

  const getFilteredStations = () => {
    let filtered = stations;

    if (selectedFilter === 'active') {
      filtered = filtered.filter((s) => s.status === 'Active');
    } else if (selectedFilter === 'critical') {
      filtered = filtered.filter((s) => {
        const criticalLevel = s.depth * 0.8;
        return s.currentWaterLevel > criticalLevel && s.status === 'Active';
      });
    } else if (selectedFilter === 'inactive') {
      filtered = filtered.filter((s) => s.status !== 'Active');
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.district.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q)
      );
    }

    return filtered.slice(0, 50);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#388E3C';
      case 'Inactive':
        return '#D32F2F';
      case 'Maintenance':
        return '#FFA726';
      default:
        return colors.onSurfaceVariant;
    }
  };

  const getRiskLevel = (station) => {
    const utilizationRate = (station.currentWaterLevel / station.depth) * 100;
    if (utilizationRate > 80) return { level: 'Critical', color: '#D32F2F' };
    if (utilizationRate > 60) return { level: 'Warning', color: '#FFA726' };
    return { level: 'Safe', color: '#388E3C' };
  };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    monsoonCard: {
      margin: 16,
      marginTop: 0,
      backgroundColor: colors.surface,
    },
    stationCard: {
      marginBottom: 12,
      backgroundColor: colors.surface,
    },
  };

  if (loading) {
    return (
      <View style={[dynamicStyles.container, styles.loadingCenter]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 8, color: colors.onSurfaceVariant }}>Loading dataâ€¦</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, gap: 8 }}>
          <DataSourceBadge />
          {firebaseDisabled && (
            <Chip mode="outlined" icon="alert" textStyle={{ color: '#c62828' }}>
              Auth offline: add Firebase env to enable login & sync
            </Chip>
          )}
          {error ? (
            <Chip mode="outlined" icon="alert" textStyle={{ color: '#c62828' }}>
              {error}
            </Chip>
          ) : null}
        </View>

        {/* Header Stats with animations */}
        <Animatable.View animation="fadeInDown" duration={600} style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            <Animatable.View animation="zoomIn" delay={100} duration={500} style={{ flex: 1 }}>
              <DataCard
                title="Total Stations"
                value={metrics.total || 0}
                icon="access-point"
                iconColor={colors.primary}
              />
            </Animatable.View>
            <Animatable.View animation="zoomIn" delay={150} duration={500} style={{ flex: 1 }}>
              <DataCard
                title="Active"
                value={metrics.active || 0}
                icon="check-circle"
                iconColor="#388E3C"
              />
            </Animatable.View>
          </View>
          <View style={styles.metricsRow}>
            <Animatable.View animation="zoomIn" delay={200} duration={500} style={{ flex: 1 }}>
              <DataCard
                title="Critical"
                value={metrics.critical || 0}
                icon="alert"
                iconColor="#D32F2F"
                subtitle="Needs attention"
              />
            </Animatable.View>
            <Animatable.View animation="zoomIn" delay={250} duration={500} style={{ flex: 1 }}>
              <DataCard
                title="Inactive"
                value={metrics.inactive || 0}
                icon="close-circle"
                iconColor="#999"
              />
            </Animatable.View>
          </View>
          <Text style={[styles.lastUpdated, { color: colors.onSurfaceVariant }]}>
            Last updated:{' '}
            {metrics.lastUpdated ? new Date(metrics.lastUpdated).toLocaleString() : 'n/a'}
          </Text>
        </Animatable.View>

        {/* Monsoon Status with animation */}
        <Animatable.View animation="fadeInUp" delay={300} duration={600}>
          <Card style={dynamicStyles.monsoonCard}>
            <Card.Content>
              <View style={styles.monsoonHeader}>
                <MaterialCommunityIcons
                  name={metrics.monsoonActive ? 'weather-rainy' : 'white-balance-sunny'}
                  size={32}
                  color={colors.primary}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    variant="titleLarge"
                    style={[styles.monsoonTitle, { color: colors.onSurface }]}
                  >
                    {metrics.monsoonActive ? 'Monsoon window' : 'Non-monsoon window'}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={[styles.monsoonStatus, { color: colors.onSurfaceVariant }]}
                  >
                    {metrics.monsoonActive
                      ? 'Expect recharge and rising levels'
                      : 'Monitor depletion and plan recharge'}
                  </Text>
                </View>
                <Chip style={{ backgroundColor: colors.primaryContainer }}>
                  {metrics.dataSource || dataService.getDataSourceInfo().dataProvider}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        </Animatable.View>

        {/* Map Preview Card */}
        <Animatable.View animation="fadeInUp" delay={350} duration={600}>
          <TouchableOpacity onPress={() => navigation.navigate('Map')} activeOpacity={0.9}>
            <Card style={[dynamicStyles.monsoonCard, { overflow: 'hidden' }]}>
              <View
                style={{
                  height: 180,
                  backgroundColor: colors.primaryContainer,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name="map-marker-radius" size={64} color={colors.primary} />
                <Text
                  variant="titleMedium"
                  style={{ color: colors.onPrimaryContainer, marginTop: 8 }}
                >
                  Interactive Station Map
                </Text>
                <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant, marginTop: 4 }}>
                  {stations.length} stations across India
                </Text>
              </View>
              <Card.Content
                style={{
                  paddingVertical: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: '#4CAF50',
                        marginRight: 4,
                      }}
                    />
                    <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                      Safe
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: '#FFA726',
                        marginRight: 4,
                      }}
                    />
                    <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                      Warning
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: '#F44336',
                        marginRight: 4,
                      }}
                    />
                    <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                      Critical
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color={colors.primary} />
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </Animatable.View>

        {/* Search and Filters */}
        <Animatable.View animation="fadeIn" delay={400} duration={600}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search stations, districts..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={[styles.searchBar, { backgroundColor: colors.surface }]}
              iconColor={colors.onSurfaceVariant}
              inputStyle={{ color: colors.onSurface }}
              placeholderTextColor={colors.onSurfaceVariant}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
            >
              <Chip
                selected={selectedFilter === 'all'}
                onPress={() => setSelectedFilter('all')}
                style={styles.filterChip}
                selectedColor={colors.primary}
              >
                All
              </Chip>
              <Chip
                selected={selectedFilter === 'active'}
                onPress={() => setSelectedFilter('active')}
                style={styles.filterChip}
                selectedColor={colors.primary}
              >
                Active
              </Chip>
              <Chip
                selected={selectedFilter === 'critical'}
                onPress={() => setSelectedFilter('critical')}
                style={styles.filterChip}
                selectedColor={colors.primary}
              >
                Critical
              </Chip>
              <Chip
                selected={selectedFilter === 'inactive'}
                onPress={() => setSelectedFilter('inactive')}
                style={styles.filterChip}
                selectedColor={colors.primary}
              >
                Inactive
              </Chip>
            </ScrollView>
          </View>
        </Animatable.View>

        {/* Station List */}
        <Animatable.View animation="fadeInUp" delay={500} duration={600}>
          <View style={styles.stationsContainer}>
            <Text variant="titleLarge" style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Stations ({getFilteredStations().length})
            </Text>
            {getFilteredStations().length === 0 ? (
              <Text style={{ color: colors.onSurfaceVariant }}>No stations available.</Text>
            ) : (
              getFilteredStations().map((station) => {
                const risk = getRiskLevel(station);
                return (
                  <TouchableOpacity
                    key={station.id}
                    onPress={() => navigation.navigate('StationDetail', { stationId: station.id })}
                    activeOpacity={0.7}
                  >
                    <Card style={dynamicStyles.stationCard}>
                      <Card.Content>
                        <View style={styles.stationHeader}>
                          <View style={{ flex: 1 }}>
                            <Text
                              variant="titleMedium"
                              style={[styles.stationName, { color: colors.onSurface }]}
                            >
                              {station.name}
                            </Text>
                            <Text
                              variant="bodySmall"
                              style={[styles.stationLocation, { color: colors.onSurfaceVariant }]}
                            >
                              {station.district}, {station.state}
                            </Text>
                          </View>
                          <Chip
                            style={[
                              styles.statusChip,
                              { backgroundColor: getStatusColor(station.status) + '20' },
                            ]}
                            textStyle={{ color: getStatusColor(station.status), fontSize: 12 }}
                          >
                            {station.status}
                          </Chip>
                        </View>
                        <View style={styles.stationMetrics}>
                          <View style={styles.metric}>
                            <MaterialCommunityIcons name="water" size={20} color={colors.primary} />
                            <Text
                              variant="bodySmall"
                              style={[styles.metricText, { color: colors.onSurface }]}
                            >
                              {station.currentWaterLevel.toFixed(1)}m
                            </Text>
                          </View>
                          <View style={styles.metric}>
                            <MaterialCommunityIcons
                              name="layers-triple"
                              size={20}
                              color={colors.onSurfaceVariant}
                            />
                            <Text
                              variant="bodySmall"
                              style={[styles.metricText, { color: colors.onSurface }]}
                              numberOfLines={1}
                            >
                              {station.aquiferType}
                            </Text>
                          </View>
                          <View style={styles.metric}>
                            <MaterialCommunityIcons
                              name={
                                risk.level === 'Critical'
                                  ? 'alert-circle'
                                  : risk.level === 'Warning'
                                    ? 'alert'
                                    : 'check-circle'
                              }
                              size={20}
                              color={risk.color}
                            />
                            <Text
                              variant="bodySmall"
                              style={[styles.metricText, { color: risk.color }]}
                            >
                              {risk.level}
                            </Text>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </Animatable.View>
      </ScrollView>

      <FAB
        icon="map"
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Map')}
        label="Map View"
        color="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  metricsContainer: {
    padding: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monsoonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monsoonTitle: {
    fontWeight: 'bold',
  },
  monsoonStatus: {
    marginTop: 4,
    opacity: 0.7,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 12,
    elevation: 2,
  },
  filterScroll: {
    marginTop: 8,
  },
  filterChip: {
    marginRight: 8,
    height: 36,
  },
  stationsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  stationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stationName: {
    fontWeight: 'bold',
  },
  stationLocation: {
    marginTop: 4,
    opacity: 0.7,
  },
  statusChip: {
    height: 28,
    marginLeft: 8,
  },
  stationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  metricText: {
    marginLeft: 4,
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loadingCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastUpdated: {
    marginTop: 4,
    textAlign: 'right',
    fontSize: 12,
  },
});

export default DashboardScreen;
