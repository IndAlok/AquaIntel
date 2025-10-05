// navigation/AppNavigator.jsx
// Bottom Tab Navigator for main app screens

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import DashboardScreen from '../screens/main/DashboardScreen';
import MapScreen from '../screens/main/MapScreen';
import StationDetailScreen from '../screens/main/StationDetailScreen';
import ForecastScreen from '../screens/main/ForecastScreen';
import ReportScreen from '../screens/main/ReportScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import AppHeader from '../components/AppHeader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack for Dashboard and Station Details
const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
      }}
    >
      <Stack.Screen 
        name="DashboardMain" 
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen 
        name="StationDetail" 
        component={StationDetailScreen}
        options={{ title: 'Station Details' }}
      />
    </Stack.Navigator>
  );
};

// Stack for Map
const MapStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
      }}
    >
      <Stack.Screen 
        name="MapMain" 
        component={MapScreen}
        options={{ title: 'Map View' }}
      />
      <Stack.Screen 
        name="StationDetail" 
        component={StationDetailScreen}
        options={{ title: 'Station Details' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map-marker' : 'map-marker-outline';
          } else if (route.name === 'Forecast') {
            iconName = focused ? 'chart-line' : 'chart-line-variant';
          } else if (route.name === 'Report') {
            iconName = focused ? 'file-document' : 'file-document-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Forecast" component={ForecastScreen} options={{ header: (props) => <AppHeader {...props} /> }} />
      <Tab.Screen name="Report" component={ReportScreen} options={{ header: (props) => <AppHeader {...props} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ header: (props) => <AppHeader {...props} /> }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
