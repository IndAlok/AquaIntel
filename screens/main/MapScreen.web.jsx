import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import dataService from '../../services/dataService';
import { useAppTheme } from '../../store/ThemeContext';
import WebMap from '../../components/WebMap';

const MapScreen = ({ navigation }) => {
  const { colors } = useAppTheme();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);

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

  const handleViewDetails = () => {
    if (selectedStation) {
      setSelectedStation(null);
      navigation.navigate('StationDetail', { stationId: selectedStation.id });
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.onSurface, marginTop: 16 }}>Loading stations...</Text>
      </View>
    );
  }

  return (
    <WebMap
      stations={stations}
      onStationSelect={setSelectedStation}
      onViewDetails={handleViewDetails}
      navigation={navigation}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
