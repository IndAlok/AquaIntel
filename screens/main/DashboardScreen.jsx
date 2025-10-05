// screens/main/DashboardScreen.jsx
// Main dashboard with overview metrics and station list - FULLY FIXED

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Searchbar, Chip, FAB, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DataCard from '../../components/DataCard';
import { mockStations, getActiveStations, getCriticalStations } from '../../data/mockStations';
import { getMonsoonStatus } from '../../data/mockRainfallData';
import { useAppTheme } from '../../store/ThemeContext';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const { colors, isDark } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [stations, setStations] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const activeStations = getActiveStations();
    const criticalStations = getCriticalStations();
    const monsoonStatus = getMonsoonStatus();

    setStations(mockStations);
    setMetrics({
      total: mockStations.length,
      active: activeStations.length,
      critical: criticalStations.length,
      inactive: mockStations.filter(s => s.status !== 'Active').length,
      monsoon: monsoonStatus,
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getFilteredStations = () => {
    let filtered = stations;

    if (selectedFilter === 'active') {
      filtered = filtered.filter(s => s.status === 'Active');
    } else if (selectedFilter === 'critical') {
      filtered = filtered.filter(s => {
        const criticalLevel = s.depth * 0.8;
        return s.currentWaterLevel > criticalLevel && s.status === 'Active';
      });
    } else if (selectedFilter === 'inactive') {
      filtered = filtered.filter(s => s.status !== 'Active');
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.slice(0, 50);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#388E3C';
      case 'Inactive': return '#D32F2F';
      case 'Maintenance': return '#FFA726';
      default: return colors.onSurfaceVariant;
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

  return (
    <View style={dynamicStyles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {/* Header Stats */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            <DataCard
              title="Total Stations"
              value={metrics.total || 0}
              icon="access-point"
              iconColor={colors.primary}
            />
            <DataCard
              title="Active"
              value={metrics.active || 0}
              icon="check-circle"
              iconColor="#388E3C"
            />
          </View>
          <View style={styles.metricsRow}>
            <DataCard
              title="Critical"
              value={metrics.critical || 0}
              icon="alert"
              iconColor="#D32F2F"
              subtitle="Needs attention"
            />
            <DataCard
              title="Inactive"
              value={metrics.inactive || 0}
              icon="close-circle"
              iconColor="#999"
            />
          </View>
        </View>

        {/* Monsoon Status Card */}
        {metrics.monsoon && (
          <Card style={dynamicStyles.monsoonCard}>
            <Card.Content>
              <View style={styles.monsoonHeader}>
                <MaterialCommunityIcons name="weather-rainy" size={32} color={colors.primary} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text variant="titleLarge" style={[styles.monsoonTitle, { color: colors.onSurface }]}>
                    {metrics.monsoon.phase}
                  </Text>
                  <Text variant="bodyMedium" style={[styles.monsoonStatus, { color: colors.onSurfaceVariant }]}>
                    Status: {metrics.monsoon.status.toUpperCase()}
                  </Text>
                </View>
                <Chip style={{ backgroundColor: colors.primaryContainer }}>
                  {metrics.monsoon.currentIntensity}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Search and Filters */}
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
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

        {/* Stations List */}
        <View style={styles.stationsContainer}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: colors.onSurface }]}>
            Stations ({getFilteredStations().length})
          </Text>
          {getFilteredStations().map((station) => {
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
                        <Text variant="titleMedium" style={[styles.stationName, { color: colors.onSurface }]}>
                          {station.name}
                        </Text>
                        <Text variant="bodySmall" style={[styles.stationLocation, { color: colors.onSurfaceVariant }]}>
                          {station.district}, {station.state}
                        </Text>
                      </View>
                      <Chip
                        style={[styles.statusChip, { backgroundColor: getStatusColor(station.status) + '20' }]}
                        textStyle={{ color: getStatusColor(station.status), fontSize: 12 }}
                      >
                        {station.status}
                      </Chip>
                    </View>
                    <View style={styles.stationMetrics}>
                      <View style={styles.metric}>
                        <MaterialCommunityIcons name="water" size={20} color={colors.primary} />
                        <Text variant="bodySmall" style={[styles.metricText, { color: colors.onSurface }]}>
                          {station.currentWaterLevel.toFixed(1)}m
                        </Text>
                      </View>
                      <View style={styles.metric}>
                        <MaterialCommunityIcons name="layers-triple" size={20} color={colors.onSurfaceVariant} />
                        <Text variant="bodySmall" style={[styles.metricText, { color: colors.onSurface }]} numberOfLines={1}>
                          {station.aquiferType}
                        </Text>
                      </View>
                      <View style={styles.metric}>
                        <MaterialCommunityIcons 
                          name={risk.level === 'Critical' ? 'alert-circle' : risk.level === 'Warning' ? 'alert' : 'check-circle'} 
                          size={20} 
                          color={risk.color} 
                        />
                        <Text variant="bodySmall" style={[styles.metricText, { color: risk.color }]}>
                          {risk.level}
                        </Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
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
});

export default DashboardScreen;
