// constants/theme.js
// Material Design 3 Theme Configuration for AquaIntel
// Incorporates Indian flag colors: Saffron, White, Green, and Blue (Ashoka Chakra)

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const indianFlagColors = {
  saffron: '#FF9933',
  white: '#FFFFFF',
  green: '#138808',
  blue: '#000080', // Navy Blue (Ashoka Chakra)
  darkBlue: '#0F4C81',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: indianFlagColors.saffron,
    secondary: indianFlagColors.blue,
    tertiary: indianFlagColors.green,
    error: '#B00020',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceVariant: '#E7E0EC',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    outline: '#79747E',
    success: indianFlagColors.green,
    warning: '#FF6F00',
    info: indianFlagColors.darkBlue,
  },
  roundness: 12,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: indianFlagColors.saffron,
    secondary: indianFlagColors.blue,
    tertiary: indianFlagColors.green,
    error: '#CF6679',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    onSurface: '#E1E1E1',
    onSurfaceVariant: '#CAC4D0',
    outline: '#938F99',
    success: '#66BB6A',
    warning: '#FFA726',
    info: '#42A5F5',
  },
  roundness: 12,
};

export const chartColors = {
  waterLevel: '#2196F3',
  rainfall: '#4CAF50',
  recharge: '#FF9800',
  prediction: '#9C27B0',
  critical: '#F44336',
  safe: '#4CAF50',
  warning: '#FFC107',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};
