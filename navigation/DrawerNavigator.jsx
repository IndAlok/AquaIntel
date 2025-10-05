// navigation/DrawerNavigator.jsx
// Drawer navigation with custom content

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import DrawerContent from '../components/DrawerContent';

// Main screens
import DashboardScreen from '../screens/main/DashboardScreen';
import MapScreen from '../screens/main/MapScreen';
import ForecastScreen from '../screens/main/ForecastScreen';
import ReportScreen from '../screens/main/ReportScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import StationDetailScreen from '../screens/main/StationDetailScreen';

// New screens
import AIChat from '../screens/main/AIChat';
import ProfileScreen from '../screens/main/ProfileScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import CommunityScreen from '../screens/main/CommunityScreen';
import OfflineDataScreen from '../screens/main/OfflineDataScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 2,
        },
        headerTintColor: theme.colors.onSurface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 300,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.onSurfaceVariant,
        drawerActiveBackgroundColor: theme.colors.primaryContainer,
        overlayColor: theme.dark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
        // Remove useLegacyImplementation - not supported in Reanimated 3
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}
    >
      {/* Main screens */}
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Map View',
          drawerLabel: 'Map View',
        }}
      />
      <Drawer.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{
          title: 'Forecast',
          drawerLabel: 'Forecast',
        }}
      />
      <Drawer.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: 'Reports',
          drawerLabel: 'Reports',
        }}
      />
      <Drawer.Screen
        name="AIChat"
        component={AIChat}
        options={{
          title: 'AI Assistant',
          drawerLabel: 'AI Assistant',
        }}
      />

      {/* Additional screens */}
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          drawerLabel: 'Notifications',
        }}
      />
      <Drawer.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: 'Community',
          drawerLabel: 'Community',
        }}
      />
      <Drawer.Screen
        name="OfflineData"
        component={OfflineDataScreen}
        options={{
          title: 'Offline Data',
          drawerLabel: 'Offline Data',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerLabel: 'Settings',
        }}
      />

      {/* Detail screen (hidden from drawer) */}
      <Drawer.Screen
        name="StationDetail"
        component={StationDetailScreen}
        options={{
          title: 'Station Details',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
