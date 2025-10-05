// components/DataCard.jsx
// Reusable card component for displaying data metrics

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DataCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  iconColor, 
  trend, 
  subtitle,
  onPress 
}) => {
  const theme = useTheme();

  const getTrendColor = () => {
    if (!trend) return theme.colors.onSurfaceVariant;
    if (trend > 0) return theme.colors.success;
    if (trend < 0) return theme.colors.error;
    return theme.colors.onSurfaceVariant;
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend > 0) return 'trending-up';
    if (trend < 0) return 'trending-down';
    return 'trending-neutral';
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          {icon && (
            <MaterialCommunityIcons 
              name={icon} 
              size={24} 
              color={iconColor || theme.colors.primary} 
            />
          )}
          <Text variant="labelLarge" style={styles.title}>{title}</Text>
        </View>
        
        <View style={styles.valueContainer}>
          <Text variant="headlineLarge" style={styles.value}>
            {value}
          </Text>
          {unit && (
            <Text variant="titleMedium" style={styles.unit}>{unit}</Text>
          )}
        </View>

        {(subtitle || trend !== undefined) && (
          <View style={styles.footer}>
            {subtitle && (
              <Text variant="bodySmall" style={styles.subtitle}>{subtitle}</Text>
            )}
            {trend !== undefined && (
              <View style={styles.trendContainer}>
                <MaterialCommunityIcons 
                  name={getTrendIcon()} 
                  size={16} 
                  color={getTrendColor()} 
                />
                <Text 
                  variant="bodySmall" 
                  style={[styles.trendText, { color: getTrendColor() }]}
                >
                  {Math.abs(trend).toFixed(1)}%
                </Text>
              </View>
            )}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
  },
  value: {
    fontWeight: 'bold',
  },
  unit: {
    marginLeft: 4,
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    marginLeft: 4,
    fontWeight: '600',
  },
});

export default DataCard;
