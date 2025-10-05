// screens/auth/SplashScreen.jsx
// Splash screen with app branding

import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons name="water" size={100} color="#0F4C81" />
        <Text variant="displayMedium" style={styles.title}>
          AquaIntel
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Real-Time Groundwater Intelligence
        </Text>
        <Text variant="bodySmall" style={styles.tagline}>
          Ministry of Jal Shakti
        </Text>
      </View>
      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          Smart India Hackathon 2025
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    marginTop: 24,
    fontWeight: 'bold',
    color: '#0F4C81',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  tagline: {
    marginTop: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  footer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
  },
});

export default SplashScreen;
