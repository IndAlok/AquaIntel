// components/WaterLevelChart.jsx
// Chart component for water level visualization using Victory Native

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryArea } from 'victory-native';

const WaterLevelChart = ({ data, title, height = 250 }) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text>No data available</Text>
      </View>
    );
  }

  // Transform data for Victory
  const chartData = data.map((item, index) => ({
    x: index,
    y: item.waterLevel || item.value || 0,
    date: item.timestamp || item.date,
  }));

  return (
    <View style={styles.container}>
      {title && <Text variant="titleMedium" style={styles.title}>{title}</Text>}
      <VictoryChart
        width={screenWidth - 32}
        height={height}
        theme={VictoryTheme.material}
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: theme.colors.outline },
            tickLabels: { fill: theme.colors.onSurface, fontSize: 10 },
          }}
          tickFormat={(t) => {
            if (chartData[t]?.date) {
              const date = new Date(chartData[t].date);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }
            return '';
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: theme.colors.outline },
            tickLabels: { fill: theme.colors.onSurface, fontSize: 10 },
            grid: { stroke: theme.colors.surfaceVariant, strokeDasharray: '4,4' },
          }}
          label="Water Level (m)"
        />
        <VictoryArea
          data={chartData}
          style={{
            data: {
              fill: theme.colors.primary,
              fillOpacity: 0.2,
              stroke: theme.colors.primary,
              strokeWidth: 2,
            },
          }}
          interpolation="natural"
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
  },
  title: {
    marginBottom: 8,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default WaterLevelChart;
