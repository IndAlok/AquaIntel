// screens/main/ReportScreen.jsx
// Community reporting and feedback screen

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Card, useTheme, TextInput, SegmentedButtons, Chip, Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { Picker } from '@react-navigation/elements';

const ReportScreen = () => {
  const theme = useTheme();
  const [reportType, setReportType] = useState('issue');
  const [category, setCategory] = useState('');
  const [stationId, setStationId] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const issueCategories = [
    'Equipment Malfunction',
    'Data Discrepancy',
    'Infrastructure Damage',
    'Unauthorized Access',
    'Environmental Concern',
    'Other',
  ];

  const feedbackCategories = [
    'Feature Request',
    'Bug Report',
    'User Experience',
    'Data Quality',
    'Performance',
    'Other',
  ];

  const handleSubmit = async () => {
    // Validation
    if (!category) {
      setSnackbarMessage('Please select a category');
      setSnackbarVisible(true);
      return;
    }

    if (reportType === 'issue' && !stationId) {
      setSnackbarMessage('Please enter a station ID');
      setSnackbarVisible(true);
      return;
    }

    if (!description.trim()) {
      setSnackbarMessage('Please provide a description');
      setSnackbarVisible(true);
      return;
    }

    if (!contactEmail.trim()) {
      setSnackbarMessage('Please provide your contact email');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSnackbarMessage('Report submitted successfully! We will review it soon.');
      setSnackbarVisible(true);
      
      // Reset form
      setCategory('');
      setStationId('');
      setDescription('');
      setContactEmail('');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.header}>
              <MaterialCommunityIcons name="message-alert" size={48} color={theme.colors.primary} />
              <View style={styles.headerText}>
                <Text variant="headlineSmall" style={styles.headerTitle}>
                  Report & Feedback
                </Text>
                <Text variant="bodyMedium" style={styles.headerSubtitle}>
                  Help us improve groundwater monitoring
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Report Type Selector */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Report Type
            </Text>
            <SegmentedButtons
              value={reportType}
              onValueChange={setReportType}
              buttons={[
                {
                  value: 'issue',
                  label: 'Station Issue',
                  icon: 'alert-circle',
                },
                {
                  value: 'feedback',
                  label: 'App Feedback',
                  icon: 'comment',
                },
              ]}
            />
          </Card.Content>
        </Card>

        {/* Category Selection */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {(reportType === 'issue' ? issueCategories : feedbackCategories).map((cat) => (
                <Chip
                  key={cat}
                  selected={category === cat}
                  onPress={() => setCategory(cat)}
                  style={styles.categoryChip}
                >
                  {cat}
                </Chip>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>

        {/* Station ID (for issues only) */}
        {reportType === 'issue' && (
          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="Station ID"
                value={stationId}
                onChangeText={setStationId}
                mode="outlined"
                placeholder="e.g., DWLR_MH_001"
                left={<TextInput.Icon icon="access-point" />}
              />
              <Text variant="bodySmall" style={styles.helperText}>
                Enter the ID of the station you want to report about
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Description */}
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              multiline
              numberOfLines={6}
              placeholder={
                reportType === 'issue'
                  ? 'Describe the issue in detail...'
                  : 'Share your feedback or suggestions...'
              }
              left={<TextInput.Icon icon="text" />}
            />
            <Text variant="bodySmall" style={styles.helperText}>
              Provide as much detail as possible
            </Text>
          </Card.Content>
        </Card>

        {/* Contact Information */}
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Contact Email"
              value={contactEmail}
              onChangeText={setContactEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="your.email@example.com"
              left={<TextInput.Icon icon="email" />}
            />
            <Text variant="bodySmall" style={styles.helperText}>
              We'll use this to follow up on your report
            </Text>
          </Card.Content>
        </Card>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <ThemedButton
            icon="send"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            Submit Report
          </ThemedButton>
        </View>

        {/* Info Cards */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoHeader}>
              <MaterialCommunityIcons name="information" size={24} color={theme.colors.primary} />
              <Text variant="titleSmall" style={styles.infoTitle}>
                Why Report Issues?
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.infoText}>
              Your reports help us maintain accurate groundwater data and ensure all monitoring
              stations are functioning properly. Together, we can improve water resource management
              across India.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoHeader}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#4CAF50" />
              <Text variant="titleSmall" style={styles.infoTitle}>
                Privacy & Data
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.infoText}>
              All reports are confidential and used solely for improving our services. Your contact
              information will not be shared with third parties.
            </Text>
          </Card.Content>
        </Card>

        {/* Recent Reports Summary */}
        <Card style={[styles.card, styles.statsCard]}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Community Impact
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={[styles.statValue, { color: theme.colors.primary }]}>
                  1,247
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Reports Submitted
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={[styles.statValue, { color: '#4CAF50' }]}>
                  892
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Issues Resolved
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={[styles.statValue, { color: '#FF9800' }]}>
                  156
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  In Progress
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerSubtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  helperText: {
    marginTop: 8,
    opacity: 0.7,
  },
  buttonContainer: {
    padding: 16,
    paddingTop: 0,
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#E3F2FD',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  infoText: {
    lineHeight: 20,
  },
  statsCard: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
  },
  statLabel: {
    marginTop: 4,
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default ReportScreen;
