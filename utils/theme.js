// utils/theme.js
// Enhanced theming utilities for AquaIntel

import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive sizing utilities
export const scale = (size) => (width / 375) * size;
export const verticalScale = (size) => (height / 812) * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Spacing system (8pt grid)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Typography system
export const typography = {
  fontFamily: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
    light: Platform.select({
      ios: 'System',
      android: 'Roboto-Light',
    }),
  },
  fontSize: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

// Shadow presets
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// Border radius
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Chart colors for data visualization
export const chartColors = {
  waterLevel: '#2196F3',
  rainfall: '#4CAF50',
  recharge: '#FF9800',
  prediction: '#9C27B0',
  critical: '#F44336',
  safe: '#4CAF50',
  warning: '#FFC107',
  gradient: {
    blue: ['#0277BD', '#01579B'],
    green: ['#388E3C', '#1B5E20'],
    orange: ['#F57C00', '#E65100'],
    purple: ['#7B1FA2', '#4A148C'],
    red: ['#D32F2F', '#B71C1C'],
  },
};

// Status colors
export const statusColors = {
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  neutral: '#9E9E9E',
};

// Water level status colors
export const waterLevelColors = {
  critical: '#D32F2F',      // Very low - red
  low: '#F57C00',           // Low - orange
  moderate: '#FFC107',      // Moderate - yellow
  good: '#8BC34A',          // Good - light green
  excellent: '#4CAF50',     // Excellent - green
  flooding: '#2196F3',      // High/flooding - blue
};

// Layout constants
export const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 414,
  isLargeDevice: width >= 414,
  headerHeight: Platform.select({ ios: 88, android: 56 }),
  tabBarHeight: 60,
  drawerWidth: width * 0.75,
};

// Animation durations (in ms)
export const animationDuration = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
};

// Z-index layers
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  notification: 800,
};

// Opacity values
export const opacity = {
  disabled: 0.38,
  hover: 0.08,
  focus: 0.12,
  selected: 0.16,
  activated: 0.24,
};

// Helper function to get themed color
export const getThemedColor = (isDark, lightColor, darkColor) => {
  return isDark ? darkColor : lightColor;
};

// Helper function to create responsive styles
export const createResponsiveStyle = (baseStyle, mediumStyle, largeStyle) => {
  if (layout.isLargeDevice && largeStyle) return { ...baseStyle, ...largeStyle };
  if (layout.isMediumDevice && mediumStyle) return { ...baseStyle, ...mediumStyle };
  return baseStyle;
};

// Common container styles
export const containerStyles = {
  screen: {
    flex: 1,
  },
  screenPadding: {
    flex: 1,
    padding: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
};

// Common text styles
export const textStyles = {
  h1: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize.xxxl * typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize.xxl * typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },
  body: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  small: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
};

export default {
  scale,
  verticalScale,
  moderateScale,
  spacing,
  typography,
  shadows,
  borderRadius,
  chartColors,
  statusColors,
  waterLevelColors,
  layout,
  animationDuration,
  zIndex,
  opacity,
  getThemedColor,
  createResponsiveStyle,
  containerStyles,
  textStyles,
};
