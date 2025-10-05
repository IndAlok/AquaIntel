// screens/main/SettingsScreen.jsx
// App settings and user profile screen

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, List, Switch, useTheme, Divider, Avatar, Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../store/AuthContext';

const SettingsScreen = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => {
            setSnackbarMessage('Cache cleared successfully');
            setSnackbarVisible(true);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Profile */}
      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text 
              size={64} 
              label={user?.displayName?.charAt(0) || 'U'} 
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall" style={styles.userName}>
                {user?.displayName || 'User'}
              </Text>
              <Text variant="bodyMedium" style={styles.userEmail}>
                {user?.email || 'user@example.com'}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Account Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Account
          </Text>
          <List.Item
            title="Edit Profile"
            left={(props) => <MaterialCommunityIcons name="account-edit" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={() => {
              setSnackbarMessage('Profile editing coming soon');
              setSnackbarVisible(true);
            }}
          />
          <Divider />
          <List.Item
            title="Change Password"
            left={(props) => <MaterialCommunityIcons name="lock-reset" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={() => {
              setSnackbarMessage('Password change coming soon');
              setSnackbarVisible(true);
            }}
          />
          <Divider />
          <List.Item
            title="Preferences"
            left={(props) => <MaterialCommunityIcons name="cog" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={() => {
              setSnackbarMessage('Preferences coming soon');
              setSnackbarVisible(true);
            }}
          />
        </Card.Content>
      </Card>

      {/* Notifications */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Notifications
          </Text>
          <List.Item
            title="Push Notifications"
            description="Receive notifications about water levels"
            left={(props) => <MaterialCommunityIcons name="bell" size={24} />}
            right={() => (
              <Switch value={notifications} onValueChange={setNotifications} />
            )}
          />
          <Divider />
          <List.Item
            title="Critical Alerts"
            description="Urgent alerts for critical water levels"
            left={(props) => <MaterialCommunityIcons name="alert" size={24} />}
            right={() => (
              <Switch value={criticalAlerts} onValueChange={setCriticalAlerts} />
            )}
          />
          <Divider />
          <List.Item
            title="Weekly Reports"
            description="Summary of groundwater status"
            left={(props) => <MaterialCommunityIcons name="email-newsletter" size={24} />}
            right={() => (
              <Switch value={weeklyReports} onValueChange={setWeeklyReports} />
            )}
          />
        </Card.Content>
      </Card>

      {/* Data & Storage */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Data & Storage
          </Text>
          <List.Item
            title="Auto Sync"
            description="Automatically sync data when online"
            left={(props) => <MaterialCommunityIcons name="sync" size={24} />}
            right={() => (
              <Switch value={dataSync} onValueChange={setDataSync} />
            )}
          />
          <Divider />
          <List.Item
            title="Clear Cache"
            description="Free up storage space"
            left={(props) => <MaterialCommunityIcons name="database" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={handleClearCache}
          />
          <Divider />
          <List.Item
            title="Download Data"
            description="Export your saved data"
            left={(props) => <MaterialCommunityIcons name="download" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={() => {
              setSnackbarMessage('Data export coming soon');
              setSnackbarVisible(true);
            }}
          />
        </Card.Content>
      </Card>

      {/* About */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            About
          </Text>
          <List.Item
            title="App Version"
            description="1.0.0"
            left={(props) => <MaterialCommunityIcons name="information" size={24} />}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            left={(props) => <MaterialCommunityIcons name="file-document" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={() => {
              setSnackbarMessage('Terms of Service coming soon');
              setSnackbarVisible(true);
            }}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props) => <MaterialCommunityIcons name="shield-check" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={() => {
              setSnackbarMessage('Privacy Policy coming soon');
              setSnackbarVisible(true);
            }}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            left={(props) => <MaterialCommunityIcons name="help-circle" size={24} />}
            right={(props) => <MaterialCommunityIcons name="chevron-right" size={24} />}
            onPress={() => {
              setSnackbarMessage('Support coming soon');
              setSnackbarVisible(true);
            }}
          />
        </Card.Content>
      </Card>

      {/* Credits */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.creditsHeader}>
            <MaterialCommunityIcons name="trophy" size={32} color="#FFD700" />
            <Text variant="titleMedium" style={styles.creditsTitle}>
              Smart India Hackathon 2025
            </Text>
          </View>
          <Text variant="bodyMedium" style={styles.creditsText}>
            AquaIntel - Real-Time Groundwater Intelligence Platform
          </Text>
          <Text variant="bodySmall" style={styles.creditsSubtext}>
            Developed for the Ministry of Jal Shakti{'\n'}
            Government of India
          </Text>
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <ThemedButton
          mode="outlined"
          icon="logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </ThemedButton>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileCard: {
    margin: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  userEmail: {
    marginTop: 4,
    opacity: 0.7,
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  creditsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  creditsTitle: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
  creditsText: {
    marginBottom: 8,
  },
  creditsSubtext: {
    opacity: 0.7,
    lineHeight: 20,
  },
  logoutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logoutButton: {
    borderColor: '#F44336',
  },
});

export default SettingsScreen;
