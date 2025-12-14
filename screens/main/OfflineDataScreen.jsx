// Offline data management and sync screen

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  Card,
  Button,
  ProgressBar,
  List,
  Switch,
  Chip,
  useTheme,
  Divider,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OfflineDataScreen = () => {
  const theme = useTheme();
  const [isConnected, setIsConnected] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Mock offline data
  const offlineData = [
    {
      id: '1',
      type: 'stations',
      title: 'Monitoring Stations',
      description: 'Water level data from 25 stations',
      size: '2.4 MB',
      lastUpdated: '2 hours ago',
      count: 25,
      icon: 'water-pump',
      syncStatus: 'synced',
    },
    {
      id: '2',
      type: 'forecasts',
      title: 'Rainfall Forecasts',
      description: '7-day predictions for Rajasthan',
      size: '1.2 MB',
      lastUpdated: '5 hours ago',
      count: 7,
      icon: 'weather-pouring',
      syncStatus: 'synced',
    },
    {
      id: '3',
      type: 'maps',
      title: 'Offline Maps',
      description: 'Jaipur district map tiles',
      size: '45.6 MB',
      lastUpdated: '1 day ago',
      count: 1,
      icon: 'map',
      syncStatus: 'outdated',
    },
    {
      id: '4',
      type: 'reports',
      title: 'Downloaded Reports',
      description: 'PDF reports and documents',
      size: '8.3 MB',
      lastUpdated: '3 days ago',
      count: 12,
      icon: 'file-pdf-box',
      syncStatus: 'synced',
    },
    {
      id: '5',
      type: 'alerts',
      title: 'Alert History',
      description: 'Past 30 days notifications',
      size: '0.5 MB',
      lastUpdated: '1 hour ago',
      count: 45,
      icon: 'bell',
      syncStatus: 'synced',
    },
    {
      id: '6',
      type: 'user',
      title: 'User Preferences',
      description: 'Settings and favorites',
      size: '0.1 MB',
      lastUpdated: '10 minutes ago',
      count: 1,
      icon: 'cog',
      syncStatus: 'pending',
    },
  ];

  const storageStats = {
    used: 58.1,
    total: 100,
    available: 41.9,
  };

  useEffect(() => {
    // Check network connectivity
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    loadSyncSettings();

    return () => unsubscribe();
  }, []);

  const loadSyncSettings = async () => {
    try {
      const autoSyncEnabled = await AsyncStorage.getItem('autoSync');
      if (autoSyncEnabled !== null) {
        setAutoSync(JSON.parse(autoSyncEnabled));
      }
    } catch (error) {
      console.error('Error loading sync settings:', error);
    }
  };

  const handleAutoSyncToggle = async () => {
    const newValue = !autoSync;
    setAutoSync(newValue);
    try {
      await AsyncStorage.setItem('autoSync', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving sync settings:', error);
    }
  };

  const handleSyncAll = async () => {
    if (!isConnected) {
      alert('No internet connection. Please check your network settings.');
      return;
    }

    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          setIsSyncing(false);
          setLastSyncTime(new Date());
          return 1;
        }
        return prev + 0.1;
      });
    }, 300);
  };

  const handleClearCache = async () => {
    // TODO: Implement cache clearing
    alert('Cache cleared successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return theme.colors.tertiary;
      case 'pending':
        return '#FF9800';
      case 'outdated':
        return theme.colors.error;
      default:
        return theme.colors.outline;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return 'check-circle';
      case 'pending':
        return 'clock-alert';
      case 'outdated':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const totalDataCount = offlineData.reduce((sum, item) => sum + item.count, 0);
  const syncedCount = offlineData.filter((item) => item.syncStatus === 'synced').length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Connection Status */}
      <Animatable.View animation="fadeInDown" duration={600}>
        <Card
          style={[
            styles.statusCard,
            {
              backgroundColor: isConnected
                ? theme.colors.tertiaryContainer
                : theme.colors.errorContainer,
            },
          ]}
        >
          <Card.Content style={styles.statusContent}>
            <MaterialCommunityIcons
              name={isConnected ? 'wifi' : 'wifi-off'}
              size={40}
              color={
                isConnected ? theme.colors.onTertiaryContainer : theme.colors.onErrorContainer
              }
            />
            <View style={styles.statusText}>
              <Text
                variant="titleMedium"
                style={{
                  color: isConnected
                    ? theme.colors.onTertiaryContainer
                    : theme.colors.onErrorContainer,
                  fontWeight: 'bold',
                }}
              >
                {isConnected ? 'Online' : 'Offline Mode'}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: isConnected
                    ? theme.colors.onTertiaryContainer
                    : theme.colors.onErrorContainer,
                }}
              >
                {isConnected
                  ? 'All features available'
                  : 'Using cached data. Some features limited.'}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      {/* Storage Stats */}
      <Animatable.View animation="fadeInUp" delay={200} duration={600}>
        <Card style={styles.statsCard}>
          <Card.Content>
            <View style={styles.statsHeader}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
                Storage Usage
              </Text>
              <Chip
                icon="database"
                compact
                style={{ backgroundColor: theme.colors.primaryContainer }}
              >
                {storageStats.used} MB / {storageStats.total} MB
              </Chip>
            </View>
            <ProgressBar
              progress={storageStats.used / storageStats.total}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Used
                </Text>
                <Text variant="titleSmall" style={{ color: theme.colors.onSurface }}>
                  {storageStats.used} MB
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Available
                </Text>
                <Text variant="titleSmall" style={{ color: theme.colors.tertiary }}>
                  {storageStats.available} MB
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Items
                </Text>
                <Text variant="titleSmall" style={{ color: theme.colors.onSurface }}>
                  {totalDataCount}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      {/* Sync Controls */}
      <Animatable.View animation="fadeInUp" delay={300} duration={600}>
        <Card style={styles.syncCard}>
          <Card.Content>
            <List.Item
              title="Auto-Sync"
              description="Automatically sync when connected to WiFi"
              left={(props) => <List.Icon {...props} icon="sync" />}
              right={() => <Switch value={autoSync} onValueChange={handleAutoSyncToggle} />}
            />
            <Divider style={styles.divider} />
            <List.Item
              title="Last Sync"
              description={lastSyncTime.toLocaleString()}
              left={(props) => <List.Icon {...props} icon="clock-outline" />}
            />
            <Divider style={styles.divider} />
            {isSyncing && (
              <View style={styles.syncingContainer}>
                <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                  Syncing data...
                </Text>
                <ProgressBar
                  progress={syncProgress}
                  color={theme.colors.primary}
                  style={styles.syncProgress}
                />
              </View>
            )}
            <View style={styles.syncButtons}>
              <Button
                mode="contained"
                icon="sync"
                onPress={handleSyncAll}
                disabled={!isConnected || isSyncing}
                style={styles.syncButton}
              >
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </Button>
              <Button
                mode="outlined"
                icon="delete-sweep"
                onPress={handleClearCache}
                disabled={isSyncing}
                style={styles.syncButton}
              >
                Clear Cache
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      {/* Offline Data Items */}
      <Animatable.View animation="fadeInUp" delay={400} duration={600}>
        <Card style={styles.dataCard}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Offline Data ({syncedCount}/{offlineData.length} synced)
            </Text>
            {offlineData.map((item, index) => (
              <React.Fragment key={item.id}>
                <List.Item
                  title={item.title}
                  description={`${item.description} â€¢ ${item.size}`}
                  left={(props) => (
                    <List.Icon {...props} icon={item.icon} color={theme.colors.primary} />
                  )}
                  right={() => (
                    <View style={styles.statusBadge}>
                      <MaterialCommunityIcons
                        name={getStatusIcon(item.syncStatus)}
                        size={20}
                        color={getStatusColor(item.syncStatus)}
                      />
                      <Text
                        variant="labelSmall"
                        style={{ color: getStatusColor(item.syncStatus), marginLeft: 4 }}
                      >
                        {item.lastUpdated}
                      </Text>
                    </View>
                  )}
                />
                {index < offlineData.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>
      </Animatable.View>

      {/* Help Section */}
      <Animatable.View animation="fadeInUp" delay={500} duration={600}>
        <Card style={styles.helpCard}>
          <Card.Content>
            <List.Item
              title="Offline Mode Tips"
              description="Data is automatically cached for offline use. Sync regularly to get latest updates."
              left={(props) => <List.Icon {...props} icon="lightbulb-outline" />}
              titleStyle={{ color: theme.colors.primary }}
            />
          </Card.Content>
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusText: {
    marginLeft: 16,
    flex: 1,
  },
  statsCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  syncCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  divider: {
    marginVertical: 8,
  },
  syncingContainer: {
    paddingVertical: 12,
  },
  syncProgress: {
    marginTop: 8,
    height: 6,
    borderRadius: 3,
  },
  syncButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  syncButton: {
    flex: 1,
  },
  dataCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 24,
    elevation: 1,
  },
});

export default OfflineDataScreen;
