import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, FAB, Portal, Modal, Card, Chip, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import dataService from '../../services/dataService';
import { useAppTheme } from '../../store/ThemeContext';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const { colors, isDark } = useAppTheme();
  const mapRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      setLoading(true);
      const data = await dataService.getStations();
      setStations(data);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (station) => {
    if (station.status !== 'Active') return '#999';
    const utilizationRate = (station.currentWaterLevel / station.depth) * 100;
    if (utilizationRate > 80) return '#F44336';
    if (utilizationRate > 60) return '#FFA726';
    return '#4CAF50';
  };

  const getFilteredStations = () => {
    if (filterType === 'all') return stations;
    if (filterType === 'active') return stations.filter((s) => s.status === 'Active');
    if (filterType === 'critical') {
      return stations.filter((s) => {
        const utilizationRate = (s.currentWaterLevel / s.depth) * 100;
        return utilizationRate > 80 && s.status === 'Active';
      });
    }
    return stations;
  };

  const handleMarkerPress = (station) => {
    setSelectedStation(station);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: station.latitude,
        longitude: station.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }
  };

  const handleViewDetails = () => {
    if (selectedStation) {
      setSelectedStation(null);
      navigation.navigate('StationDetail', { stationId: selectedStation.id });
    }
  };

  const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  ];

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.onSurface, marginTop: 16 }}>Loading stations...</Text>
      </View>
    );
  }

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

      {selectedStation && (
        <Animatable.View animation="slideInUp" duration={400}>
          <Card style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <View style={styles.infoHeader}>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="titleMedium"
                    style={[styles.infoTitle, { color: colors.onSurface }]}
                  >
                    {selectedStation.name}
                  </Text>
                  <Text
                    variant="bodySmall"
                    style={[styles.infoLocation, { color: colors.onSurfaceVariant }]}
                  >
                    {selectedStation.district}, {selectedStation.state}
                  </Text>
                </View>
                <Chip style={{ backgroundColor: getMarkerColor(selectedStation) + '20' }}>
                  {selectedStation.status}
                </Chip>
              </View>
              <View style={styles.infoMetrics}>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                    Water Level
                  </Text>
                  <Text variant="titleMedium" style={{ color: colors.onSurface }}>
                    {selectedStation.currentWaterLevel.toFixed(1)}m
                  </Text>
                </View>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                    Aquifer Type
                  </Text>
                  <Text variant="titleMedium" style={{ color: colors.onSurface }}>
                    {selectedStation.aquiferType}
                  </Text>
                </View>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                    Depth
                  </Text>
                  <Text variant="titleMedium" style={{ color: colors.onSurface }}>
                    {selectedStation.depth}m
                  </Text>
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

      <FAB
        icon="filter"
        style={[styles.filterFab, { backgroundColor: colors.primary }]}
        onPress={() => setFilterVisible(true)}
        label={
          filterType === 'all' ? 'All Stations' : filterType === 'active' ? 'Active' : 'Critical'
        }
      />

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
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1, width: '100%', height: '100%' },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    elevation: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoTitle: { fontWeight: 'bold' },
  infoLocation: { marginTop: 4 },
  infoMetrics: { flexDirection: 'row', justifyContent: 'space-between' },
  infoMetric: { alignItems: 'center' },
  detailsFab: { elevation: 2 },
  closeFab: { elevation: 2 },
  filterFab: { position: 'absolute', right: 16, top: 16 },
  modalContent: { margin: 20, padding: 20, borderRadius: 12 },
  modalTitle: { marginBottom: 16, fontWeight: 'bold' },
  modalChip: { marginBottom: 8 },
});

export default MapScreen;
