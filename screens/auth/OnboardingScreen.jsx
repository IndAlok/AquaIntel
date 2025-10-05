// screens/auth/OnboardingScreen.jsx
// Onboarding screen with feature highlights

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../store/AuthContext';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Real-Time Monitoring',
    description: 'Access live data from 5,260+ DWLR stations across India',
    icon: 'chart-line',
    color: '#2196F3',
  },
  {
    id: '2',
    title: 'Predictive Analytics',
    description: 'AI-powered forecasts for groundwater levels and trends',
    icon: 'brain',
    color: '#9C27B0',
  },
  {
    id: '3',
    title: 'Interactive Maps',
    description: 'Visualize groundwater data on interactive geographical maps',
    icon: 'map-marker-radius',
    color: '#4CAF50',
  },
  {
    id: '4',
    title: 'Community Insights',
    description: 'Report issues and collaborate with researchers',
    icon: 'account-group',
    color: '#FF9800',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const theme = useTheme();
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = async () => {
    await completeOnboarding();
    navigation.replace('Login');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <MaterialCommunityIcons name={item.icon} size={120} color={item.color} />
      <Text variant="headlineMedium" style={styles.title}>
        {item.title}
      </Text>
      <Text variant="bodyLarge" style={styles.description}>
        {item.description}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentIndex ? theme.colors.primary : '#CCC',
              width: index === currentIndex ? 24 : 8,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      {renderDots()}

      <View style={styles.buttonContainer}>
        {currentIndex < onboardingData.length - 1 ? (
          <>
            <ThemedButton mode="outlined" onPress={handleSkip} style={styles.button}>
              Skip
            </ThemedButton>
            <ThemedButton onPress={handleNext} style={styles.button}>
              Next
            </ThemedButton>
          </>
        ) : (
          <ThemedButton onPress={handleGetStarted} style={styles.fullButton}>
            Get Started
          </ThemedButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    marginTop: 32,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  fullButton: {
    flex: 1,
  },
});

export default OnboardingScreen;
