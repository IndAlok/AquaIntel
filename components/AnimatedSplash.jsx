// components/AnimatedSplash.jsx
// Animated splash screen with logo entrance and smooth transitions

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const AnimatedSplash = ({ onFinish }) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Logo scale and fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Slide up text
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto finish after animations
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, slideAnim, onFinish]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Gradient overlay - simple colored view */}
      <View
        style={[
          styles.gradient,
          {
            backgroundColor: theme.dark ? '#1565C0' : '#90CAF9',
            opacity: 0.1,
          },
        ]}
      />

      {/* Animated logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
          <MaterialCommunityIcons 
            name="water" 
            size={120} 
            color={theme.colors.primary}
          />
        </Animatable.View>
      </Animated.View>

      {/* Animated text */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Animatable.Text
          animation="fadeIn"
          delay={400}
          style={[styles.title, { color: theme.colors.onBackground }]}
        >
          AquaIntel
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={600}
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          जल है तो कल है
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={800}
          style={[styles.tagline, { color: theme.colors.primary }]}
        >
          Smart Groundwater Intelligence
        </Animatable.Text>
      </Animated.View>

      {/* Loading indicator */}
      <Animatable.View
        animation="fadeIn"
        delay={1000}
        style={styles.loadingContainer}
      >
        <Animatable.View
          animation="flash"
          iterationCount="infinite"
          duration={1500}
          style={[styles.loadingDot, { backgroundColor: theme.colors.primary }]}
        />
        <Animatable.View
          animation="flash"
          iterationCount="infinite"
          duration={1500}
          delay={200}
          style={[styles.loadingDot, { backgroundColor: theme.colors.primary }]}
        />
        <Animatable.View
          animation="flash"
          iterationCount="infinite"
          duration={1500}
          delay={400}
          style={[styles.loadingDot, { backgroundColor: theme.colors.primary }]}
        />
      </Animatable.View>

      {/* Ministry branding */}
      <Animatable.View
        animation="fadeInUp"
        delay={1200}
        style={styles.brandingContainer}
      >
        <Text style={[styles.branding, { color: theme.colors.onSurfaceVariant }]}>
          Ministry of Jal Shakti
        </Text>
        <Text style={[styles.brandingSmall, { color: theme.colors.outline }]}>
          Department of Water Resources, River Development and Ganga Rejuvenation
        </Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  logoContainer: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: 60,
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  brandingContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  branding: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  brandingSmall: {
    fontSize: 9,
    textAlign: 'center',
  },
});

export default AnimatedSplash;
