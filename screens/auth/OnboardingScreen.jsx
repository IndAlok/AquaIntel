import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../store/AuthContext';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Real-Time Monitoring',
    desc: 'Access live data from 5,260+ DWLR stations across India',
    icon: 'chart-line',
    color: '#2196F3',
  },
  {
    id: '2',
    title: 'Predictive Analytics',
    desc: 'AI-powered forecasts for groundwater levels and trends',
    icon: 'brain',
    color: '#9C27B0',
  },
  {
    id: '3',
    title: 'Interactive Maps',
    desc: 'Visualize groundwater data on interactive geographical maps',
    icon: 'map-marker-radius',
    color: '#4CAF50',
  },
  {
    id: '4',
    title: 'Community Insights',
    desc: 'Report issues and collaborate with researchers',
    icon: 'account-group',
    color: '#FF9800',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const theme = useTheme();
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      handleDone();
    }
  };

  const handleDone = async () => {
    await completeOnboarding();
    navigation.replace('Login');
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if (index !== currentIndex && index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <MaterialCommunityIcons name={slide.icon} size={120} color={slide.color} />
            <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
              {slide.title}
            </Text>
            <Text variant="bodyLarge" style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
              {slide.desc}
            </Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? theme.colors.primary : theme.colors.outline,
                width: index === currentIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.buttons}>
        {currentIndex < slides.length - 1 ? (
          <>
            <ThemedButton mode="outlined" onPress={handleDone} style={styles.button}>
              Skip
            </ThemedButton>
            <ThemedButton onPress={handleNext} style={styles.button}>
              Next
            </ThemedButton>
          </>
        ) : (
          <ThemedButton onPress={handleDone} style={styles.fullButton}>
            Get Started
          </ThemedButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  slide: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 32 
  },
  title: { 
    marginTop: 32, 
    marginBottom: 16, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  desc: { 
    textAlign: 'center', 
    paddingHorizontal: 16 
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  dot: { 
    height: 8, 
    borderRadius: 4, 
    marginHorizontal: 4 
  },
  buttons: { 
    flexDirection: 'row', 
    paddingHorizontal: 24, 
    paddingBottom: 32, 
    gap: 12 
  },
  button: { 
    flex: 1 
  },
  fullButton: { 
    flex: 1 
  },
});

export default OnboardingScreen;
