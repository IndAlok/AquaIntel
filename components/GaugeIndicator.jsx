// components/GaugeIndicator.jsx
// Circular gauge indicator for water level status

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Circle, Path } from 'react-native-svg';

const GaugeIndicator = ({ 
  value, 
  maxValue, 
  size = 150, 
  title, 
  unit,
  criticalThreshold = 0.8,
  warningThreshold = 0.6 
}) => {
  const theme = useTheme();
  const percentage = Math.min(Math.max(value / maxValue, 0), 1);
  
  // Determine color based on threshold
  const getColor = () => {
    if (percentage >= criticalThreshold) return theme.colors.error;
    if (percentage >= warningThreshold) return '#FFA726';
    return theme.colors.success;
  };

  const color = getColor();
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <View style={styles.container}>
      {title && <Text variant="titleMedium" style={styles.title}>{title}</Text>}
      <View style={styles.gaugeContainer}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.colors.surfaceVariant}
            strokeWidth={12}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={12}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.valueContainer}>
          <Text variant="headlineMedium" style={[styles.value, { color }]}>
            {value.toFixed(1)}
          </Text>
          {unit && <Text variant="bodySmall">{unit}</Text>}
          <Text variant="bodySmall" style={styles.percentage}>
            {(percentage * 100).toFixed(0)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  gaugeContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
  },
  percentage: {
    marginTop: 4,
    opacity: 0.7,
  },
});

export default GaugeIndicator;
