import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryArea } from 'victory-native';
import { useAppTheme } from '../store/ThemeContext';

const WaterLevelChart = ({ data, title, height = 250 }) => {
  const { colors, isDark } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height, backgroundColor: colors.surface }]}>
        <Text style={{ color: colors.onSurface }}>No data available</Text>
      </View>
    );
  }

  const chartData = data.map((item, index) => ({
    x: index,
    y: item.waterLevel || item.value || 0,
    date: item.timestamp || item.date,
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {title && <Text variant="titleMedium" style={[styles.title, { color: colors.onSurface }]}>{title}</Text>}
      <VictoryChart
        width={Math.min(screenWidth - 32, 600)}
        height={height}
        theme={VictoryTheme.material}
        padding={{ top: 20, bottom: 60, left: 80, right: 30 }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: colors.outline },
            tickLabels: { fill: colors.onSurface, fontSize: 10, padding: 5 },
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
            axis: { stroke: colors.outline },
            tickLabels: { fill: colors.onSurface, fontSize: 10, padding: 5 },
            grid: { stroke: colors.surfaceVariant, strokeDasharray: '4,4' },
          }}
          label="Water Level (m)"
        />
        <VictoryArea
          data={chartData}
          style={{
            data: {
              fill: colors.primary,
              fillOpacity: 0.2,
              stroke: colors.primary,
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
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    marginBottom: 8,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default WaterLevelChart;
