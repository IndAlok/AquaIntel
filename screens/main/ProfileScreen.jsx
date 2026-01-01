import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import {
  Text,
  Avatar,
  Card,
  List,
  Divider,
  Button,
  TextInput,
  useTheme,
  Portal,
  Dialog,
  Snackbar,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../store/AuthContext';

const ProfileScreen = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const profileStats = [
    { label: 'Stations Monitored', value: '12', icon: 'water-pump' },
    { label: 'Reports Generated', value: '28', icon: 'file-document' },
    { label: 'Alerts Received', value: '5', icon: 'bell' },
    { label: 'Days Active', value: '45', icon: 'calendar-check' },
  ];

  const accountSections = [
    {
      title: 'Account Information',
      items: [
        { label: 'Email', value: user?.email, icon: 'email' },
        { label: 'Phone', value: '+91 98765 43210', icon: 'phone' },
        { label: 'Role', value: 'Citizen', icon: 'account-badge' },
        { label: 'Member Since', value: 'Jan 2025', icon: 'calendar' },
      ],
    },
    {
      title: 'Location',
      items: [
        { label: 'State', value: 'Rajasthan', icon: 'map-marker' },
        { label: 'District', value: 'Jaipur', icon: 'city' },
        { label: 'Block', value: 'Sanganer', icon: 'home-city' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Language', value: 'English', icon: 'translate' },
        { label: 'Units', value: 'Metric', icon: 'ruler' },
        { label: 'Notifications', value: 'Enabled', icon: 'bell-ring' },
      ],
    },
  ];

  const handleEditProfile = () => {
    setEditDialogVisible(true);
  };

  const handleSaveProfile = () => {
    setEditDialogVisible(false);
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarVisible(true);
  };

  const handleLogout = () => {
    setLogoutDialogVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutDialogVisible(false);
    await logout();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <Animatable.View animation="fadeInDown" duration={600}>
        <Card style={[styles.headerCard, { backgroundColor: theme.colors.primaryContainer }]}>
          <Card.Content style={styles.headerContent}>
            <Avatar.Text
              size={80}
              label={user?.displayName?.substring(0, 2).toUpperCase() || 'U'}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <Text
              variant="headlineMedium"
              style={[styles.name, { color: theme.colors.onPrimaryContainer }]}
            >
              {user?.displayName || 'User'}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onPrimaryContainer, opacity: 0.8 }}
            >
              {user?.email}
            </Text>
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="shield-check" size={20} color={theme.colors.tertiary} />
              <Text variant="labelMedium" style={{ color: theme.colors.tertiary, marginLeft: 4 }}>
                Verified Account
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={200} duration={600}>
        <View style={styles.statsGrid}>
          {profileStats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <MaterialCommunityIcons name={stat.icon} size={28} color={theme.colors.primary} />
                <Text
                  variant="headlineSmall"
                  style={[styles.statValue, { color: theme.colors.onSurface }]}
                >
                  {stat.value}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
                >
                  {stat.label}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </Animatable.View>

      {accountSections.map((section, sectionIndex) => (
        <Animatable.View
          key={sectionIndex}
          animation="fadeInUp"
          delay={300 + sectionIndex * 100}
          duration={600}
        >
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Text
                variant="titleMedium"
                style={[styles.sectionTitle, { color: theme.colors.primary }]}
              >
                {section.title}
              </Text>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <List.Item
                    title={item.label}
                    description={item.value}
                    left={(props) => <List.Icon {...props} icon={item.icon} />}
                    titleStyle={{ color: theme.colors.onSurfaceVariant }}
                    descriptionStyle={{ color: theme.colors.onSurface, fontWeight: '500' }}
                  />
                  {itemIndex < section.items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Card.Content>
          </Card>
        </Animatable.View>
      ))}

      <Animatable.View animation="fadeInUp" delay={600} duration={600}>
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            icon="pencil"
            onPress={handleEditProfile}
            style={styles.actionButton}
          >
            Edit Profile
          </Button>
          <Button
            mode="outlined"
            icon="logout"
            onPress={handleLogout}
            style={styles.actionButton}
            textColor={theme.colors.error}
          >
            Logout
          </Button>
        </View>
      </Animatable.View>

      <Portal>
        <Dialog visible={editDialogVisible} onDismiss={() => setEditDialogVisible(false)}>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Phone Number"
              value="+91 98765 43210"
              mode="outlined"
              style={styles.dialogInput}
              keyboardType="phone-pad"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleSaveProfile}>Save</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={logoutDialogVisible} onDismiss={() => setLogoutDialogVisible(false)}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setLogoutDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmLogout} textColor={theme.colors.error}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
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
    alignItems: 'center',
    paddingVertical: 24,
  },
  name: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 8,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    elevation: 1,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValue: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  sectionCard: {
    margin: 16,
    marginTop: 8,
    elevation: 1,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 4,
  },
  dialogInput: {
    marginBottom: 12,
  },
});

export default ProfileScreen;
