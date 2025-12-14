import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
const USE_ND = Platform.OS !== 'web';

const AnimatedSplash = ({ onFinish }) => {
  const t = useTheme();
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.3)).current;
  const slide = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: USE_ND }),
        Animated.spring(scale, { toValue: 1, friction: 8, tension: 40, useNativeDriver: USE_ND }),
      ]),
      Animated.timing(slide, { toValue: 0, duration: 600, delay: 200, useNativeDriver: USE_ND }),
    ]).start();
    const timer = setTimeout(() => onFinish?.(), 2500);
    return () => clearTimeout(timer);
  }, [fade, scale, slide, onFinish]);

  return (
    <View style={[styles.container, { backgroundColor: t.colors.background }]}>
      <View
        style={[styles.gradient, { backgroundColor: t.dark ? '#1565C0' : '#90CAF9', opacity: 0.1 }]}
      />
      <Animated.View style={{ marginBottom: 40, opacity: fade, transform: [{ scale }] }}>
        <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
          <MaterialCommunityIcons name="water" size={120} color={t.colors.primary} />
        </Animatable.View>
      </Animated.View>
      <Animated.View
        style={{ alignItems: 'center', opacity: fade, transform: [{ translateY: slide }] }}
      >
        <Animatable.Text
          animation="fadeIn"
          delay={400}
          style={[styles.title, { color: t.colors.onSurface }]}
        >
          AquaIntel
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={600}
          style={[styles.subtitle, { color: t.colors.onSurfaceVariant }]}
        >
          जल है तो कल है
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={800}
          style={[styles.tagline, { color: t.colors.primary }]}
        >
          Smart Groundwater Intelligence
        </Animatable.Text>
      </Animated.View>
      <Animatable.View animation="fadeIn" delay={1000} style={styles.dots}>
        <Animatable.View
          animation="flash"
          iterationCount="infinite"
          duration={1500}
          style={[styles.dot, { backgroundColor: t.colors.primary }]}
        />
        <Animatable.View
          animation="flash"
          iterationCount="infinite"
          duration={1500}
          delay={200}
          style={[styles.dot, { backgroundColor: t.colors.primary }]}
        />
        <Animatable.View
          animation="flash"
          iterationCount="infinite"
          duration={1500}
          delay={400}
          style={[styles.dot, { backgroundColor: t.colors.primary }]}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={1200} style={styles.branding}>
        <Text style={[styles.brandText, { color: t.colors.onSurfaceVariant }]}>
          Ministry of Jal Shakti
        </Text>
        <Text style={[styles.brandSmall, { color: t.colors.outline }]}>
          Department of Water Resources
        </Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  gradient: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  title: { fontSize: 42, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  subtitle: { fontSize: 18, fontWeight: '500', marginBottom: 4 },
  tagline: { fontSize: 14, fontStyle: 'italic' },
  dots: { flexDirection: 'row', marginTop: 60, gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  branding: { position: 'absolute', bottom: 40, alignItems: 'center', paddingHorizontal: 20 },
  brandText: { fontSize: 12, fontWeight: '600', marginBottom: 4, textAlign: 'center' },
  brandSmall: { fontSize: 9, textAlign: 'center' },
});

export default AnimatedSplash;
