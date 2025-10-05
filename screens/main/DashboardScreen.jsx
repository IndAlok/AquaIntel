// screens/main/DashboardScreen.jsx
// Main dashboard with overview metrics and station list

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, useTheme, Searchbar, Chip, FAB, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DataCard from '../../components/DataCard';
import { mockStations, getActiveStations, getCriticalStations } from '../../data/mockStations';
import { getMonsoonStatus } from '../../data/mockRainfallData';

const DashboardScreen = ({ navigation }) => {
  const theme = useTheme();
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

    return filtered.slice(0, 50); // Limit to 50 for performance
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return theme.colors.success;
      case 'Inactive': return theme.colors.error;
      case 'Maintenance': return '#FFA726';
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getRiskLevel = (station) => {
    const utilizationRate = (station.currentWaterLevel / station.depth) * 100;
    if (utilizationRate > 80) return { level: 'Critical', color: theme.colors.error };
    if (utilizationRate > 60) return { level: 'Warning', color: '#FFA726' };
    return { level: 'Safe', color: theme.colors.success };
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header Stats */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            <DataCard
              title="Total Stations"
              value={metrics.total}
              icon="access-point"
              iconColor={theme.colors.primary}
            />
            <DataCard
              title="Active"
              value={metrics.active}
              icon="check-circle"
              iconColor={theme.colors.success}
            />
          </View>
          <View style={styles.metricsRow}>
            <DataCard
              title="Critical"
              value={metrics.critical}
              icon="alert"
              iconColor={theme.colors.error}
              subtitle="Needs attention"
            />
            <DataCard
              title="Inactive"
              value={metrics.inactive}
              icon="close-circle"
              iconColor="#999"
            />
          </View>
        </View>

        {/* Monsoon Status Card */}
        {metrics.monsoon && (
          <Card style={styles.monsoonCard}>
            <Card.Content>
              <View style={styles.monsoonHeader}>
                <MaterialCommunityIcons name="weather-rainy" size={32} color={theme.colors.primary} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text variant="titleLarge" style={styles.monsoonTitle}>
                    {metrics.monsoon.phase}
                  </Text>
                  <Text variant="bodyMedium" style={styles.monsoonStatus}>
                    Status: {metrics.monsoon.status.toUpperCase()}
                  </Text>
                </View>
                <Chip>{metrics.monsoon.currentIntensity}</Chip>
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
            style={styles.searchBar}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <Chip
              selected={selectedFilter === 'all'}
              onPress={() => setSelectedFilter('all')}
              style={styles.filterChip}
            >
              All
            </Chip>
            <Chip
              selected={selectedFilter === 'active'}
              onPress={() => setSelectedFilter('active')}
              style={styles.filterChip}
            >
              Active
            </Chip>
            <Chip
              selected={selectedFilter === 'critical'}
              onPress={() => setSelectedFilter('critical')}
              style={styles.filterChip}
            >
              Critical
            </Chip>
            <Chip
              selected={selectedFilter === 'inactive'}
              onPress={() => setSelectedFilter('inactive')}
              style={styles.filterChip}
            >
              Inactive
            </Chip>
          </ScrollView>
        </View>

        {/* Stations List */}
        <View style={styles.stationsContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Stations ({getFilteredStations().length})
          </Text>
          {getFilteredStations().map((station) => {
            const risk = getRiskLevel(station);
            return (
              <TouchableOpacity
                key={station.id}
                onPress={() => navigation.navigate('StationDetail', { stationId: station.id })}
              >
                <Card style={styles.stationCard}>
                  <Card.Content>
                    <View style={styles.stationHeader}>
                      <View style={{ flex: 1 }}>
                        <Text variant="titleMedium" style={styles.stationName}>
                          {station.name}
                        </Text>
                        <Text variant="bodySmall" style={styles.stationLocation}>
                          {station.district}, {station.state}
                        </Text>
                      </View>
                      <Chip
                        style={[styles.statusChip, { backgroundColor: getStatusColor(station.status) + '20' }]}
                        textStyle={{ color: getStatusColor(station.status) }}
                      >
                        {station.status}
                      </Chip>
                    </View>
                    <View style={styles.stationMetrics}>
                      <View style={styles.metric}>
                        <MaterialCommunityIcons name="water" size={20} color={theme.colors.primary} />
                        <Text variant="bodySmall" style={styles.metricText}>
                          {station.currentWaterLevel.toFixed(1)}m depth
                        </Text>
                      </View>
                      <View style={styles.metric}>
                        <MaterialCommunityIcons name="layers-triple" size={20} color="#666" />
                        <Text variant="bodySmall" style={styles.metricText}>
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
        style={styles.fab}
        onPress={() => navigation.navigate('Map')}
        label="Map View"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  metricsContainer: {
    padding: 8,
  },
  metricsRow: {
    flexDirection: 'row',
  },
  monsoonCard: {
    margin: 16,
    marginTop: 0,
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
  },
  filterScroll: {
    marginTop: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  stationsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  stationCard: {
    marginBottom: 12,
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
  },
  stationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default DashboardScreen;
