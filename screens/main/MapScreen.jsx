// screens/main/MapScreen.jsx
// Interactive map view with station markers

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, FAB, Portal, Modal, Card, Chip, useTheme } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mockStations } from '../../data/mockStations';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const theme = useTheme();
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
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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
        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoHeader}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium" style={styles.infoTitle}>
                  {selectedStation.name}
                </Text>
                <Text variant="bodySmall" style={styles.infoLocation}>
                  {selectedStation.district}, {selectedStation.state}
                </Text>
              </View>
              <Chip style={{ backgroundColor: getMarkerColor(selectedStation) + '20' }}>
                {selectedStation.status}
              </Chip>
            </View>
            <View style={styles.infoMetrics}>
              <View style={styles.infoMetric}>
                <Text variant="labelSmall">Water Level</Text>
                <Text variant="titleMedium">{selectedStation.currentWaterLevel.toFixed(1)}m</Text>
              </View>
              <View style={styles.infoMetric}>
                <Text variant="labelSmall">Aquifer Type</Text>
                <Text variant="titleMedium">{selectedStation.aquiferType}</Text>
              </View>
              <View style={styles.infoMetric}>
                <Text variant="labelSmall">Depth</Text>
                <Text variant="titleMedium">{selectedStation.depth}m</Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <FAB
              icon="eye"
              label="View Details"
              onPress={handleViewDetails}
              style={styles.detailsFab}
              small
            />
            <FAB
              icon="close"
              onPress={() => setSelectedStation(null)}
              style={styles.closeFab}
              small
            />
          </Card.Actions>
        </Card>
      )}

      {/* Filter FAB */}
      <FAB
        icon="filter"
        style={styles.filterFab}
        onPress={() => setFilterVisible(true)}
        label={filterType === 'all' ? 'All Stations' : filterType === 'active' ? 'Active' : 'Critical'}
      />

      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={filterVisible}
          onDismiss={() => setFilterVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
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
