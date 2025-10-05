// components/DataCard.jsx
// Reusable card component for displaying data metrics

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../store/ThemeContext';

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
  const { colors } = useAppTheme();

  const getTrendColor = () => {
    if (!trend) return colors.onSurfaceVariant;
    if (trend > 0) return '#388E3C';
    if (trend < 0) return '#D32F2F';
    return colors.onSurfaceVariant;
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend > 0) return 'trending-up';
    if (trend < 0) return 'trending-down';
    return 'trending-neutral';
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          {icon && (
            <MaterialCommunityIcons 
              name={icon} 
              size={24} 
              color={iconColor || colors.primary} 
            />
          )}
          <Text variant="labelLarge" style={[styles.title, { color: colors.onSurface }]} numberOfLines={2}>
            {title}
          </Text>
        </View>
        
        <View style={styles.valueContainer}>
          <Text variant="headlineLarge" style={[styles.value, { color: colors.onSurface }]}>
            {value !== undefined && value !== null ? value : '-'}
          </Text>
          {unit && (
            <Text variant="titleMedium" style={[styles.unit, { color: colors.onSurfaceVariant }]}>{unit}</Text>
          )}
        </View>

        {(subtitle || trend !== undefined) && (
          <View style={styles.footer}>
            {subtitle && (
              <Text variant="bodySmall" style={[styles.subtitle, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                {subtitle}
              </Text>
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
    flex: 1,
    minHeight: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
    minHeight: 40,
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
    minHeight: 20,
  },
  subtitle: {
    opacity: 0.7,
    flex: 1,
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
