// components/DrawerContent.jsx
// Custom drawer menu with profile section and navigation

import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  Drawer,
  Text,
  Avatar,
  Divider,
  Switch,
  useTheme,
  Badge,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAuth } from '../store/AuthContext';
import { useAppTheme } from '../store/ThemeContext';
import * as Animatable from 'react-native-animatable';

const DrawerContent = (props) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useAppTheme();
  const { navigation, state } = props;

  const currentRoute = state.routeNames[state.index];

  const handleLogout = async () => {
    await logout();
    navigation.closeDrawer();
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'view-dashboard',
      route: 'Dashboard',
      badge: null,
    },
    {
      label: 'Map View',
      icon: 'map-marker-multiple',
      route: 'Map',
      badge: null,
    },
    {
      label: 'Forecast',
      icon: 'weather-partly-cloudy',
      route: 'Forecast',
      badge: 'New',
    },
    {
      label: 'Reports',
      icon: 'file-chart',
      route: 'Report',
      badge: null,
    },
    {
      label: 'AI Assistant',
      icon: 'robot',
      route: 'AIChat',
      badge: 'AI',
    },
  ];

  const additionalItems = [
    {
      label: 'Notifications',
      icon: 'bell',
      route: 'Notifications',
      badge: 3,
    },
    {
      label: 'Community',
      icon: 'account-group',
      route: 'Community',
      badge: null,
    },
    {
      label: 'Offline Data',
      icon: 'database',
      route: 'OfflineData',
      badge: null,
    },
    {
      label: 'Profile',
      icon: 'account',
      route: 'Profile',
      badge: null,
    },
    {
      label: 'Settings',
      icon: 'cog',
      route: 'Settings',
      badge: null,
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* User Profile Section */}
      <Animatable.View animation="fadeInLeft" duration={600}>
        <View style={[styles.userSection, { backgroundColor: theme.colors.surfaceVariant }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
          >
            <Avatar.Text
              size={64}
              label={user?.displayName?.substring(0, 2).toUpperCase() || 'U'}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={styles.userInfo}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
                {user?.displayName || 'User'}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                {user?.email || 'user@aquaintel.gov.in'}
              </Text>
              <View style={styles.statusBadge}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={14}
                  color={theme.colors.primary}
                />
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.primary, marginLeft: 4 }}
                >
                  Verified User
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>

      <Divider style={styles.divider} />

      {/* Main Menu Items */}
      <Animatable.View animation="fadeInLeft" delay={200} duration={600}>
        <View style={styles.menuSection}>
          <Text
            variant="labelSmall"
            style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}
          >
            MAIN MENU
          </Text>
          {menuItems.map((item, index) => (
            <Drawer.Item
              key={item.route}
              label={item.label}
              icon={({ size, color }) => (
                <MaterialCommunityIcons name={item.icon} size={size} color={color} />
              )}
              active={currentRoute === item.route}
              onPress={() => navigation.navigate(item.route)}
              style={[
                styles.drawerItem,
                currentRoute === item.route && {
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
              right={() =>
                item.badge ? (
                  <Badge
                    size={20}
                    style={{
                      backgroundColor:
                        typeof item.badge === 'string'
                          ? theme.colors.tertiary
                          : theme.colors.error,
                    }}
                  >
                    {item.badge}
                  </Badge>
                ) : null
              }
            />
          ))}
        </View>
      </Animatable.View>

      <Divider style={styles.divider} />

      {/* Additional Features */}
      <Animatable.View animation="fadeInLeft" delay={400} duration={600}>
        <View style={styles.menuSection}>
          <Text
            variant="labelSmall"
            style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}
          >
            MORE
          </Text>
          {additionalItems.map((item, index) => (
            <Drawer.Item
              key={item.route}
              label={item.label}
              icon={({ size, color }) => (
                <MaterialCommunityIcons name={item.icon} size={size} color={color} />
              )}
              active={currentRoute === item.route}
              onPress={() => navigation.navigate(item.route)}
              style={[
                styles.drawerItem,
                currentRoute === item.route && {
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
              right={() =>
                item.badge && typeof item.badge === 'number' ? (
                  <Badge size={20} style={{ backgroundColor: theme.colors.error }}>
                    {item.badge}
                  </Badge>
                ) : null
              }
            />
          ))}
        </View>
      </Animatable.View>

      <Divider style={styles.divider} />

      {/* Theme Toggle */}
      <Animatable.View animation="fadeInLeft" delay={600} duration={600}>
        <View style={styles.themeSection}>
          <View style={styles.themeToggle}>
            <MaterialCommunityIcons
              name={isDark ? 'weather-night' : 'weather-sunny'}
              size={24}
              color={theme.colors.onSurface}
            />
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, flex: 1 }}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>
      </Animatable.View>

      <Divider style={styles.divider} />

      {/* Logout Button */}
      <Animatable.View animation="fadeInLeft" delay={800} duration={600}>
        <Drawer.Item
          label="Logout"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="logout" size={size} color={color} />
          )}
          onPress={handleLogout}
          style={styles.drawerItem}
        />
      </Animatable.View>

      {/* App Version */}
      <View style={styles.footer}>
        <Text variant="labelSmall" style={{ color: theme.colors.outline, textAlign: 'center' }}>
          AquaIntel v1.0.0
        </Text>
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.outline, textAlign: 'center', marginTop: 4 }}
        >
          Ministry of Jal Shakti
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userSection: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  menuSection: {
    paddingVertical: 8,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  drawerItem: {
    marginHorizontal: 8,
    borderRadius: 8,
  },
  divider: {
    marginVertical: 8,
  },
  themeSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
