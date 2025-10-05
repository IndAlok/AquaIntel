// screens/main/MapScreen.jsx
// Interactive map view with station markers - FULLY FIXED

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, FAB, Portal, Modal, Card, Chip } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { mockStations } from '../../data/mockStations';
import { useAppTheme } from '../../store/ThemeContext';
import { darkMapStyle } from '../../config/mapStyles';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const { colors, isDark } = useAppTheme();
  const mapRef = useRef(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const getMarkerColor = (station) => {
    if (station.status !== 'Active') return '#999';
    
    const utilizationRate = (station.currentWaterLevel / station.depth) * 100;
    if (utilizationRate > 80) return '#F44336'; // Critical - Red
    if (utilizationRate > 60) return '#FFA726'; // Warning - Orange
    return '#4CAF50'; // Safe - Green
  };

  const getFilteredStations = () => {
    if (filterType === 'all') return mockStations;
    if (filterType === 'active') return mockStations.filter(s => s.status === 'Active');
    if (filterType === 'critical') {
      return mockStations.filter(s => {
        const utilizationRate = (s.currentWaterLevel / s.depth) * 100;
        return utilizationRate > 80 && s.status === 'Active';
      });
    }
    return mockStations;
  };

  const handleMarkerPress = (station) => {
    setSelectedStation(station);
    mapRef.current?.animateToRegion({
      latitude: station.latitude,
      longitude: station.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    });
  };

  const handleViewDetails = () => {
    if (selectedStation) {
      setSelectedStation(null);
      navigation.navigate('StationDetail', { stationId: selectedStation.id });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={isDark ? darkMapStyle : []}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
      >
        {getFilteredStations().map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            pinColor={getMarkerColor(station)}
            onPress={() => handleMarkerPress(station)}
          >
            <View style={[styles.marker, { backgroundColor: getMarkerColor(station) }]}>
              <MaterialCommunityIcons name="water" size={20} color="#fff" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Station Info Card */}
      {selectedStation && (
        <Animatable.View animation="slideInUp" duration={400}>
          <Card style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <View style={styles.infoHeader}>
                <View style={{ flex: 1 }}>
                  <Text variant="titleMedium" style={[styles.infoTitle, { color: colors.onSurface }]}>
                    {selectedStation.name}
                  </Text>
                  <Text variant="bodySmall" style={[styles.infoLocation, { color: colors.onSurfaceVariant }]}>
                    {selectedStation.district}, {selectedStation.state}
                  </Text>
                </View>
                <Chip style={{ backgroundColor: getMarkerColor(selectedStation) + '20' }}>
                  {selectedStation.status}
                </Chip>
              </View>
              <View style={styles.infoMetrics}>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>Water Level</Text>
                  <Text variant="titleMedium" style={{ color: colors.onSurface }}>{selectedStation.currentWaterLevel.toFixed(1)}m</Text>
                </View>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>Aquifer Type</Text>
                  <Text variant="titleMedium" style={{ color: colors.onSurface }}>{selectedStation.aquiferType}</Text>
                </View>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>Depth</Text>
                  <Text variant="titleMedium" style={{ color: colors.onSurface }}>{selectedStation.depth}m</Text>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <FAB
                icon="eye"
                label="View Details"
                onPress={handleViewDetails}
                style={[styles.detailsFab, { backgroundColor: colors.primary }]}
                small
              />
              <FAB
                icon="close"
                onPress={() => setSelectedStation(null)}
                style={[styles.closeFab, { backgroundColor: colors.surfaceVariant }]}
                small
              />
            </Card.Actions>
          </Card>
        </Animatable.View>
      )}

      {/* Filter FAB */}
      <FAB
        icon="filter"
        style={[styles.filterFab, { backgroundColor: colors.primary }]}
        onPress={() => setFilterVisible(true)}
        label={filterType === 'all' ? 'All Stations' : filterType === 'active' ? 'Active' : 'Critical'}
      />

      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={filterVisible}
          onDismiss={() => setFilterVisible(false)}
          contentContainerStyle={[styles.modalContent, { backgroundColor: colors.surface }]}
        >
          <Animatable.View animation="zoomIn" duration={300}>
            <Text variant="titleLarge" style={[styles.modalTitle, { color: colors.onSurface }]}>
              Filter Stations
            </Text>
            <Chip
              selected={filterType === 'all'}
              onPress={() => {
                setFilterType('all');
                setFilterVisible(false);
              }}
              style={styles.modalChip}
            >
              All Stations
            </Chip>
            <Chip
              selected={filterType === 'active'}
              onPress={() => {
                setFilterType('active');
                setFilterVisible(false);
              }}
              style={styles.modalChip}
            >
              Active Only
            </Chip>
            <Chip
              selected={filterType === 'critical'}
              onPress={() => {
                setFilterType('critical');
                setFilterVisible(false);
              }}
              style={styles.modalChip}
            >
              Critical Stations
            </Chip>
          </Animatable.View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoCard: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    elevation: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoTitle: {
    fontWeight: 'bold',
  },
  infoLocation: {
    marginTop: 4,
    opacity: 0.7,
  },
  infoMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoMetric: {
    alignItems: 'center',
  },
  detailsFab: {
    flex: 1,
    marginRight: 8,
  },
  closeFab: {
    backgroundColor: '#999',
  },
  filterFab: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  modalChip: {
    marginBottom: 12,
  },
});

export default MapScreen;
