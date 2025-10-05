// store/ThemeContext.js
// Theme context with dark mode support

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

// Custom colors for water/environmental theme
const customColors = {
  primary: '#0277BD',      // Deep water blue
  secondary: '#FF9933',    // Indian saffron
  tertiary: '#138808',     // Green (from Indian flag)
  danger: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
  info: '#0288D1',
};

// Light theme configuration
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: customColors.primary,
    secondary: customColors.secondary,
    tertiary: customColors.tertiary,
    error: customColors.danger,
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceVariant: '#E3F2FD',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#424242',
    outline: '#BDBDBD',
    outlineVariant: '#E0E0E0',
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#F8F9FA',
      level3: '#F1F3F4',
      level4: '#ECEFF1',
      level5: '#E8EAF6',
    },
  },
  roundness: 12,
};

// Dark theme configuration
const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#64B5F6',      // Lighter blue for dark mode
    secondary: '#FFB74D',    // Lighter saffron
    tertiary: '#81C784',     // Lighter green
    error: '#EF5350',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#B0B0B0',
    outline: '#3F3F3F',
    outlineVariant: '#2A2A2A',
    elevation: {
      level0: 'transparent',
      level1: '#1E1E1E',
      level2: '#232323',
      level3: '#252525',
      level4: '#272727',
      level5: '#2C2C2C',
    },
  },
  roundness: 12,
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', or 'system'

  // Load theme preference from storage
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Apply theme based on mode
  useEffect(() => {
    if (themeMode === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [themeMode, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (mode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeMode(mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    saveThemePreference(newMode);
  };

  const setThemeModeValue = (mode) => {
    saveThemePreference(mode);
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value = {
    theme,
    isDark,
    themeMode,
    toggleTheme,
    setThemeMode: setThemeModeValue,
    colors: theme.colors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};
