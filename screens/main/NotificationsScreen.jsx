// Notifications and alerts screen

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import {
  Text,
  Card,
  Chip,
  IconButton,
  useTheme,
  Searchbar,
  SegmentedButtons,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const NotificationsScreen = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'alert',
      title: 'Critical Water Level Alert',
      message: 'Water level in Jaipur District has dropped below critical threshold (5.2m)',
      time: '10 minutes ago',
      read: false,
      severity: 'high',
      icon: 'alert-circle',
      color: theme.colors.error,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Heavy Rainfall Expected',
      message: 'IMD forecasts 100mm+ rainfall in next 48 hours. Prepare for possible flooding.',
      time: '2 hours ago',
      read: false,
      severity: 'medium',
      icon: 'weather-pouring',
      color: theme.colors.tertiary,
    },
    {
      id: '3',
      type: 'info',
      title: 'Data Update Available',
      message: 'New groundwater data available for 15 monitoring stations in your region.',
      time: '5 hours ago',
      read: true,
      severity: 'low',
      icon: 'information',
      color: theme.colors.primary,
    },
    {
      id: '4',
      type: 'success',
      title: 'Water Level Improving',
      message: 'Good news! Water table has risen by 1.5m after recent monsoon activity.',
      time: '1 day ago',
      read: true,
      severity: 'low',
      icon: 'check-circle',
      color: theme.colors.tertiary,
    },
    {
      id: '5',
      type: 'alert',
      title: 'Maintenance Scheduled',
      message: 'Station JD-045 will undergo maintenance on Jan 15. Data may be unavailable.',
      time: '2 days ago',
      read: true,
      severity: 'medium',
      icon: 'tools',
      color: '#FF9800',
    },
    {
      id: '6',
      type: 'info',
      title: 'New Report Published',
      message: 'Annual Groundwater Report 2024-25 is now available for download.',
      time: '3 days ago',
      read: true,
      severity: 'low',
      icon: 'file-document',
      color: theme.colors.primary,
    },
    {
      id: '7',
      type: 'warning',
      title: 'Aquifer Stress Detected',
      message: 'Increased extraction detected in Sanganer block. Consider water conservation.',
      time: '5 days ago',
      read: true,
      severity: 'medium',
      icon: 'water-alert',
      color: '#FF9800',
    },
    {
      id: '8',
      type: 'success',
      title: 'Recharge Project Success',
      message: 'Community recharge pit project showing 30% improvement in local water levels!',
      time: '1 week ago',
      read: true,
      severity: 'low',
      icon: 'thumb-up',
      color: theme.colors.tertiary,
    },
  ];

  const filterButtons = [
    { value: 'all', label: 'All', icon: 'bell' },
    { value: 'alert', label: 'Alerts', icon: 'alert-circle' },
    { value: 'warning', label: 'Warnings', icon: 'alert' },
    { value: 'info', label: 'Info', icon: 'information' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter((n) => n.type === filterType);
    }

    // Filter by search
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderNotification = (notification, index) => {
    return (
      <Animatable.View
        key={notification.id}
        animation="fadeInRight"
        duration={500}
        delay={index * 100}
      >
        <Card
          style={[
            styles.notificationCard,
            !notification.read && styles.unreadCard,
            { backgroundColor: notification.read ? theme.colors.surface : theme.colors.surfaceVariant },
          ]}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={notification.icon}
                size={28}
                color={notification.color}
              />
              {!notification.read && (
                <View style={[styles.unreadDot, { backgroundColor: theme.colors.error }]} />
              )}
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.headerRow}>
                <Text
                  variant="titleSmall"
                  style={[
                    styles.title,
                    { color: theme.colors.onSurface },
                    !notification.read && styles.unreadTitle,
                  ]}
                  numberOfLines={1}
                >
                  {notification.title}
                </Text>
                <IconButton
                  icon="dots-vertical"
                  size={20}
                  onPress={() => {}}
                />
              </View>

              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
                numberOfLines={2}
              >
                {notification.message}
              </Text>

              <View style={styles.footer}>
                <Chip
                  icon="clock-outline"
                  compact
                  style={styles.timeChip}
                  textStyle={{ fontSize: 11 }}
                >
                  {notification.time}
                </Chip>
                {notification.severity === 'high' && (
                  <Chip
                    icon="alert"
                    compact
                    style={[styles.severityChip, { backgroundColor: theme.colors.errorContainer }]}
                    textStyle={{ fontSize: 11, color: theme.colors.onErrorContainer }}
                  >
                    Urgent
                  </Chip>
                )}
              </View>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header Stats */}
      <Animatable.View animation="fadeInDown" duration={600}>
        <Card style={[styles.headerCard, { backgroundColor: theme.colors.primaryContainer }]}>
          <Card.Content style={styles.headerContent}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="bell-badge"
                size={32}
                color={theme.colors.onPrimaryContainer}
              />
              <Text variant="headlineSmall" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>
                {unreadCount}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onPrimaryContainer }}>
                Unread
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="bell-ring"
                size={32}
                color={theme.colors.onPrimaryContainer}
              />
              <Text variant="headlineSmall" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>
                {notifications.length}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onPrimaryContainer }}>
                Total
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      {/* Search and Filter */}
      <Animatable.View animation="fadeIn" delay={200} duration={600}>
        <View style={styles.controlsContainer}>
          <Searchbar
            placeholder="Search notifications..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            elevation={1}
          />
          <SegmentedButtons
            value={filterType}
            onValueChange={setFilterType}
            buttons={filterButtons}
            style={styles.segmentedButtons}
          />
        </View>
      </Animatable.View>

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredNotifications.length === 0 ? (
          <Animatable.View animation="fadeIn" style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="bell-off"
              size={64}
              color={theme.colors.outline}
            />
            <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}>
              No notifications found
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline, marginTop: 8 }}>
              {searchQuery ? 'Try different search terms' : 'You\'re all caught up!'}
            </Text>
          </Animatable.View>
        ) : (
          filteredNotifications.map((notification, index) =>
            renderNotification(notification, index)
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  controlsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchBar: {
    marginBottom: 12,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  notificationCard: {
    marginBottom: 12,
    elevation: 1,
  },
  unreadCard: {
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  iconContainer: {
    marginRight: 12,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  timeChip: {
    height: 24,
  },
  severityChip: {
    height: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
});

export default NotificationsScreen;
