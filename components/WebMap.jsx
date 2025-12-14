// Web-compatible map using Leaflet for browser environment

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Card, Chip, FAB, Portal, Modal, Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useAppTheme } from '../store/ThemeContext';

// Only import Leaflet on web
let MapContainer, TileLayer, Marker, Popup, useMap;
if (typeof window !== 'undefined') {
  const reactLeaflet = require('react-leaflet');
  MapContainer = reactLeaflet.MapContainer;
  TileLayer = reactLeaflet.TileLayer;
  Marker = reactLeaflet.Marker;
  Popup = reactLeaflet.Popup;
  useMap = reactLeaflet.useMap;

  // Import Leaflet CSS
  require('leaflet/dist/leaflet.css');

  // Fix Leaflet default marker icons
  const L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

const createCustomIcon = (color) => {
  if (typeof window === 'undefined') return null;
  const L = require('leaflet');

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 30px;
      height: 30px;
      background-color: ${color};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg style="transform: rotate(45deg); width: 16px; height: 16px; fill: white;" viewBox="0 0 24 24">
        <path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z"/>
      </svg>
    </div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });
};

const MapEventHandler = ({ onMapClick }) => {
  const map = useMap();
  useEffect(() => {
    map.on('click', onMapClick);
    return () => map.off('click', onMapClick);
  }, [map, onMapClick]);
  return null;
};

const WebMap = ({ stations, onStationSelect, onViewDetails, navigation }) => {
  const { colors, isDark } = useAppTheme();
  const [selectedStation, setSelectedStation] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);

  const getMarkerColor = (station) => {
    if (station.status !== 'Active') return '#999999';
    const utilizationRate = (station.currentWaterLevel / station.depth) * 100;
    if (utilizationRate > 80) return '#F44336';
    if (utilizationRate > 60) return '#FFA726';
    return '#4CAF50';
  };

  const getFilteredStations = () => {
    let filtered = stations || [];

    if (filterType === 'active') {
      filtered = filtered.filter((s) => s.status === 'Active');
    } else if (filterType === 'critical') {
      filtered = filtered.filter((s) => {
        const utilizationRate = (s.currentWaterLevel / s.depth) * 100;
        return utilizationRate > 80 && s.status === 'Active';
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.district?.toLowerCase().includes(q) ||
          s.state?.toLowerCase().includes(q)
      );
    }

    return filtered;
  };

  const handleMarkerClick = (station) => {
    setSelectedStation(station);
    if (onStationSelect) onStationSelect(station);
  };

  const handleViewDetails = () => {
    if (selectedStation && navigation) {
      navigation.navigate('StationDetail', { stationId: selectedStation.id });
    } else if (selectedStation && onViewDetails) {
      onViewDetails(selectedStation);
    }
    setSelectedStation(null);
  };

  const handleMapClick = () => {
    setSelectedStation(null);
  };

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const filteredStations = getFilteredStations();

  if (!MapContainer) {
    return (
      <View style={[styles.fallback, { backgroundColor: colors.background }]}>
        <Text>Map loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search stations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchBar, { backgroundColor: colors.surface }]}
          inputStyle={{ color: colors.onSurface }}
          iconColor={colors.onSurfaceVariant}
          placeholderTextColor={colors.onSurfaceVariant}
        />
      </View>

      {/* Map */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={styles.map}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={tileUrl}
        />
        <MapEventHandler onMapClick={handleMapClick} />

        {filteredStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={createCustomIcon(getMarkerColor(station))}
            eventHandlers={{
              click: () => handleMarkerClick(station),
            }}
          >
            <Popup>
              <div style={{ minWidth: 200, padding: 8 }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{station.name}</h4>
                <p style={{ margin: '4px 0', color: '#666', fontSize: 12 }}>
                  {station.district}, {station.state}
                </p>
                <p style={{ margin: '4px 0', fontSize: 12 }}>
                  <strong>Water Level:</strong> {station.currentWaterLevel?.toFixed(1)}m
                </p>
                <p style={{ margin: '4px 0', fontSize: 12 }}>
                  <strong>Depth:</strong> {station.depth}m
                </p>
                <p style={{ margin: '4px 0', fontSize: 12 }}>
                  <strong>Status:</strong>
                  <span
                    style={{
                      color: station.status === 'Active' ? '#4CAF50' : '#F44336',
                      marginLeft: 4,
                    }}
                  >
                    {station.status}
                  </span>
                </p>
                <button
                  onClick={() => handleViewDetails()}
                  style={{
                    marginTop: 8,
                    padding: '8px 16px',
                    backgroundColor: '#1976D2',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Station Info Card */}
      {selectedStation && (
        <Animatable.View animation="slideInUp" duration={400} style={styles.infoCardContainer}>
          <Card style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <View style={styles.infoHeader}>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="titleMedium"
                    style={{ color: colors.onSurface, fontWeight: 'bold' }}
                  >
                    {selectedStation.name}
                  </Text>
                  <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                    {selectedStation.district}, {selectedStation.state}
                  </Text>
                </View>
                <Chip
                  style={{
                    backgroundColor: getMarkerColor(selectedStation) + '20',
                  }}
                  textStyle={{ color: getMarkerColor(selectedStation) }}
                >
                  {selectedStation.status}
                </Chip>
              </View>
              <View style={styles.infoMetrics}>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                    Water Level
                  </Text>
                  <Text variant="titleMedium" style={{ color: colors.onSurface }}>
                    {selectedStation.currentWaterLevel?.toFixed(1)}m
                  </Text>
                </View>
                <View style={styles.infoMetric}>
                  <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                    Aquifer
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
            <Card.Actions style={styles.cardActions}>
              <FAB
                icon="eye"
                label="View Details"
                onPress={handleViewDetails}
                style={[styles.detailsFab, { backgroundColor: colors.primary }]}
                color={colors.onPrimary}
                size="small"
              />
              <FAB
                icon="close"
                onPress={() => setSelectedStation(null)}
                style={[styles.closeFab, { backgroundColor: colors.surfaceVariant }]}
                color={colors.onSurfaceVariant}
                size="small"
              />
            </Card.Actions>
          </Card>
        </Animatable.View>
      )}

      {/* Filter FAB */}
      <FAB
        icon="filter"
        style={[styles.filterFab, { backgroundColor: colors.primary }]}
        color={colors.onPrimary}
        onPress={() => setFilterVisible(true)}
        label={filterType === 'all' ? 'All' : filterType === 'active' ? 'Active' : 'Critical'}
      />

      {/* Stats Overlay */}
      <View style={[styles.statsOverlay, { backgroundColor: colors.surface + 'E6' }]}>
        <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
          Showing {filteredStations.length} stations
        </Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
            <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
              Safe
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFA726' }]} />
            <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
              Warning
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
            <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
              Critical
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={filterVisible}
          onDismiss={() => setFilterVisible(false)}
          contentContainerStyle={[styles.modalContent, { backgroundColor: colors.surface }]}
        >
          <Animatable.View animation="zoomIn" duration={300}>
            <Text variant="titleLarge" style={{ color: colors.onSurface, marginBottom: 16 }}>
              Filter Stations
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFilterType('all');
                setFilterVisible(false);
              }}
              style={[
                styles.filterOption,
                filterType === 'all' && { backgroundColor: colors.primaryContainer },
              ]}
            >
              <MaterialCommunityIcons
                name="map-marker-multiple"
                size={24}
                color={filterType === 'all' ? colors.primary : colors.onSurfaceVariant}
              />
              <Text
                style={{
                  color: filterType === 'all' ? colors.primary : colors.onSurface,
                  marginLeft: 12,
                }}
              >
                All Stations
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilterType('active');
                setFilterVisible(false);
              }}
              style={[
                styles.filterOption,
                filterType === 'active' && { backgroundColor: colors.primaryContainer },
              ]}
            >
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color={filterType === 'active' ? colors.primary : colors.onSurfaceVariant}
              />
              <Text
                style={{
                  color: filterType === 'active' ? colors.primary : colors.onSurface,
                  marginLeft: 12,
                }}
              >
                Active Only
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilterType('critical');
                setFilterVisible(false);
              }}
              style={[
                styles.filterOption,
                filterType === 'critical' && { backgroundColor: colors.primaryContainer },
              ]}
            >
              <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color={filterType === 'critical' ? colors.primary : colors.onSurfaceVariant}
              />
              <Text
                style={{
                  color: filterType === 'critical' ? colors.primary : colors.onSurface,
                  marginLeft: 12,
                }}
              >
                Critical Stations
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  searchBar: {
    elevation: 4,
    borderRadius: 8,
  },
  infoCardContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  infoCard: {
    borderRadius: 12,
    elevation: 6,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoMetric: {
    alignItems: 'center',
  },
  cardActions: {
    justifyContent: 'flex-end',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  detailsFab: {
    elevation: 2,
  },
  closeFab: {
    elevation: 2,
  },
  filterFab: {
    position: 'absolute',
    right: 16,
    top: 80,
    zIndex: 1000,
  },
  statsOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    padding: 12,
    borderRadius: 8,
    zIndex: 999,
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  modalContent: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default WebMap;
