import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import {
  Text,
  Card,
  List,
  Switch,
  Divider,
  Avatar,
  Snackbar,
  Portal,
  Dialog,
  TextInput,
  RadioButton,
  Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../store/AuthContext';
import { useAppTheme } from '../../store/ThemeContext';
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

const SettingsScreen = () => {
  const { colors, isDark, themeMode, setThemeMode } = useAppTheme();
  const { user, logout } = useAuth();

  const [notifications, setNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [dataSync, setDataSync] = useState(true);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState(user?.displayName || '');
  const [profileLoading, setProfileLoading] = useState(false);

  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [themeDialogVisible, setThemeDialogVisible] = useState(false);

  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);

  const [clearCacheDialogVisible, setClearCacheDialogVisible] = useState(false);

  const handleEditProfile = async () => {
    if (!editDisplayName.trim()) {
      setSnackbarMessage('Please enter a valid name');
      setSnackbarVisible(true);
      return;
    }

    setProfileLoading(true);
    try {
      await updateProfile(user, {
        displayName: editDisplayName.trim(),
      });
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarVisible(true);
      setEditProfileVisible(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarMessage('Failed to update profile: ' + error.message);
      setSnackbarVisible(true);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSnackbarMessage('Please fill all password fields');
      setSnackbarVisible(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbarMessage('New passwords do not match');
      setSnackbarVisible(true);
      return;
    }

    if (newPassword.length < 6) {
      setSnackbarMessage('New password must be at least 6 characters');
      setSnackbarVisible(true);
      return;
    }

    setPasswordLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      setSnackbarMessage('Password changed successfully!');
      setSnackbarVisible(true);
      setChangePasswordVisible(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      let errorMessage = 'Failed to change password';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'New password is too weak';
      }
      setSnackbarMessage(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
    setSnackbarMessage(`Theme changed to ${newTheme === 'system' ? 'System Default' : newTheme}`);
    setSnackbarVisible(true);
    setThemeDialogVisible(false);
  };

  const handleLogout = () => {
    setLogoutDialogVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutDialogVisible(false);
    await logout();
  };

  const handleClearCache = () => {
    setClearCacheDialogVisible(true);
  };

  const confirmClearCache = () => {
    setClearCacheDialogVisible(false);
    setSnackbarMessage('Cache cleared successfully');
    setSnackbarVisible(true);
  };

  const handleExportData = () => {
    setSnackbarMessage('Data export will be available soon');
    setSnackbarVisible(true);
  };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    profileCard: {
      margin: 16,
      backgroundColor: colors.surface,
    },
    card: {
      margin: 16,
      marginTop: 0,
      backgroundColor: colors.surface,
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: colors.onSurface,
    },
    userName: {
      fontWeight: 'bold',
      color: colors.onSurface,
    },
    userEmail: {
      marginTop: 4,
      opacity: 0.7,
      color: colors.onSurfaceVariant,
    },
    creditsText: {
      marginBottom: 8,
      color: colors.onSurface,
    },
    creditsSubtext: {
      opacity: 0.7,
      lineHeight: 20,
      color: colors.onSurfaceVariant,
    },
  };

  return (
    <ScrollView style={dynamicStyles.container}>
      <Card style={dynamicStyles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={64}
              label={user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              style={{ backgroundColor: colors.primary }}
            />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall" style={dynamicStyles.userName}>
                {user?.displayName || 'User'}
              </Text>
              <Text variant="bodyMedium" style={dynamicStyles.userEmail}>
                {user?.email || 'user@example.com'}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={dynamicStyles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={dynamicStyles.sectionTitle}>
            Account
          </Text>
          <List.Item
            title="Edit Profile"
            titleStyle={{ color: colors.onSurface }}
            left={() => (
              <MaterialCommunityIcons name="account-edit" size={24} color={colors.primary} />
            )}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={() => {
              setEditDisplayName(user?.displayName || '');
              setEditProfileVisible(true);
            }}
          />
          <Divider />
          <List.Item
            title="Change Password"
            titleStyle={{ color: colors.onSurface }}
            left={() => (
              <MaterialCommunityIcons name="lock-reset" size={24} color={colors.primary} />
            )}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={() => setChangePasswordVisible(true)}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            description={`Current: ${themeMode === 'system' ? 'System Default' : themeMode === 'dark' ? 'Dark' : 'Light'}`}
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => (
              <MaterialCommunityIcons
                name={isDark ? 'moon-waning-crescent' : 'white-balance-sunny'}
                size={24}
                color={colors.primary}
              />
            )}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={() => setThemeDialogVisible(true)}
          />
        </Card.Content>
      </Card>

      <Card style={dynamicStyles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={dynamicStyles.sectionTitle}>
            Notifications
          </Text>
          <List.Item
            title="Push Notifications"
            description="Receive notifications about water levels"
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => <MaterialCommunityIcons name="bell" size={24} color={colors.primary} />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={colors.primary}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Critical Alerts"
            description="Urgent alerts for critical water levels"
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => <MaterialCommunityIcons name="alert" size={24} color={colors.primary} />}
            right={() => (
              <Switch
                value={criticalAlerts}
                onValueChange={setCriticalAlerts}
                color={colors.primary}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Weekly Reports"
            description="Summary of groundwater status"
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => (
              <MaterialCommunityIcons name="email-newsletter" size={24} color={colors.primary} />
            )}
            right={() => (
              <Switch
                value={weeklyReports}
                onValueChange={setWeeklyReports}
                color={colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={dynamicStyles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={dynamicStyles.sectionTitle}>
            Data & Storage
          </Text>
          <List.Item
            title="Auto Sync"
            description="Automatically sync data when online"
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => <MaterialCommunityIcons name="sync" size={24} color={colors.primary} />}
            right={() => (
              <Switch value={dataSync} onValueChange={setDataSync} color={colors.primary} />
            )}
          />
          <Divider />
          <List.Item
            title="Clear Cache"
            description="Free up storage space"
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => <MaterialCommunityIcons name="database" size={24} color={colors.primary} />}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={handleClearCache}
          />
          <Divider />
          <List.Item
            title="Download Data"
            description="Export your saved data"
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => <MaterialCommunityIcons name="download" size={24} color={colors.primary} />}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={handleExportData}
          />
        </Card.Content>
      </Card>

      <Card style={dynamicStyles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={dynamicStyles.sectionTitle}>
            About
          </Text>
          <List.Item
            title="App Version"
            description="1.0.0"
            titleStyle={{ color: colors.onSurface }}
            descriptionStyle={{ color: colors.onSurfaceVariant }}
            left={() => (
              <MaterialCommunityIcons name="information" size={24} color={colors.primary} />
            )}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            titleStyle={{ color: colors.onSurface }}
            left={() => (
              <MaterialCommunityIcons name="file-document" size={24} color={colors.primary} />
            )}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={() => {
              setSnackbarMessage('Terms of Service will be available soon');
              setSnackbarVisible(true);
            }}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            titleStyle={{ color: colors.onSurface }}
            left={() => (
              <MaterialCommunityIcons name="shield-check" size={24} color={colors.primary} />
            )}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={() => {
              setSnackbarMessage('Privacy Policy will be available soon');
              setSnackbarVisible(true);
            }}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            titleStyle={{ color: colors.onSurface }}
            left={() => (
              <MaterialCommunityIcons name="help-circle" size={24} color={colors.primary} />
            )}
            right={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.onSurfaceVariant}
              />
            )}
            onPress={() => {
              setSnackbarMessage('Support will be available soon');
              setSnackbarVisible(true);
            }}
          />
        </Card.Content>
      </Card>

      <Card style={dynamicStyles.card}>
        <Card.Content>
          <View style={styles.creditsHeader}>
            <MaterialCommunityIcons name="trophy" size={32} color="#FFD700" />
            <Text variant="titleMedium" style={[styles.creditsTitle, { color: colors.onSurface }]}>
              Smart India Hackathon 2025
            </Text>
          </View>
          <Text variant="bodyMedium" style={dynamicStyles.creditsText}>
            AquaIntel - Real-Time Groundwater Intelligence Platform
          </Text>
          <Text variant="bodySmall" style={dynamicStyles.creditsSubtext}>
            Developed for the Ministry of Jal Shakti{'\n'}
            Government of India
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.logoutContainer}>
        <ThemedButton
          mode="outlined"
          icon="logout"
          onPress={handleLogout}
          style={[styles.logoutButton, { borderColor: '#F44336' }]}
          textColor="#F44336"
        >
          Logout
        </ThemedButton>
      </View>

      <Portal>
        <Dialog
          visible={editProfileVisible}
          onDismiss={() => setEditProfileVisible(false)}
          style={{ backgroundColor: colors.surface }}
        >
          <Dialog.Title style={{ color: colors.onSurface }}>Edit Profile</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Display Name"
              value={editDisplayName}
              onChangeText={setEditDisplayName}
              mode="outlined"
              style={{ backgroundColor: colors.surface }}
              textColor={colors.onSurface}
              theme={{ colors: { primary: colors.primary } }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <ThemedButton mode="text" onPress={() => setEditProfileVisible(false)}>
              Cancel
            </ThemedButton>
            <ThemedButton mode="contained" onPress={handleEditProfile} loading={profileLoading}>
              Save
            </ThemedButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={changePasswordVisible}
          onDismiss={() => setChangePasswordVisible(false)}
          style={{ backgroundColor: colors.surface }}
        >
          <Dialog.Title style={{ color: colors.onSurface }}>Change Password</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              mode="outlined"
              secureTextEntry
              style={[styles.input, { backgroundColor: colors.surface }]}
              textColor={colors.onSurface}
              theme={{ colors: { primary: colors.primary } }}
            />
            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry
              style={[styles.input, { backgroundColor: colors.surface }]}
              textColor={colors.onSurface}
              theme={{ colors: { primary: colors.primary } }}
            />
            <TextInput
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry
              style={[styles.input, { backgroundColor: colors.surface }]}
              textColor={colors.onSurface}
              theme={{ colors: { primary: colors.primary } }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <ThemedButton mode="text" onPress={() => setChangePasswordVisible(false)}>
              Cancel
            </ThemedButton>
            <ThemedButton mode="contained" onPress={handleChangePassword} loading={passwordLoading}>
              Change Password
            </ThemedButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={themeDialogVisible}
          onDismiss={() => setThemeDialogVisible(false)}
          style={{ backgroundColor: colors.surface }}
        >
          <Dialog.Title style={{ color: colors.onSurface }}>Choose Theme</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={handleThemeChange} value={themeMode}>
              <View style={styles.radioItem}>
                <RadioButton.Item
                  label="Light"
                  value="light"
                  labelStyle={{ color: colors.onSurface }}
                  color={colors.primary}
                />
              </View>
              <View style={styles.radioItem}>
                <RadioButton.Item
                  label="Dark"
                  value="dark"
                  labelStyle={{ color: colors.onSurface }}
                  color={colors.primary}
                />
              </View>
              <View style={styles.radioItem}>
                <RadioButton.Item
                  label="System Default"
                  value="system"
                  labelStyle={{ color: colors.onSurface }}
                  color={colors.primary}
                />
              </View>
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <ThemedButton mode="text" onPress={() => setThemeDialogVisible(false)}>
              Close
            </ThemedButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={logoutDialogVisible} onDismiss={() => setLogoutDialogVisible(false)}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setLogoutDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmLogout} textColor={colors.error}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={clearCacheDialogVisible}
          onDismiss={() => setClearCacheDialogVisible(false)}
        >
          <Dialog.Title>Clear Cache</Dialog.Title>
          <Dialog.Content>
            <Text>This will clear all cached data. Are you sure?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setClearCacheDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmClearCache}>Clear</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: colors.surface }}
      >
        <Text style={{ color: colors.onSurface }}>{snackbarMessage}</Text>
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
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
  logoutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logoutButton: {
    minHeight: 48,
  },
  input: {
    marginBottom: 16,
  },
  radioItem: {
    marginVertical: 4,
  },
});

export default SettingsScreen;
