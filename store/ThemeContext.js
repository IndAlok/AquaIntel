import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0277BD',
    secondary: '#FF9933',
    tertiary: '#138808',
    error: '#D32F2F',
    errorContainer: '#FFCDD2',
    onErrorContainer: '#B71C1C',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceVariant: '#E3F2FD',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#424242',
    outline: '#BDBDBD',
    outlineVariant: '#E0E0E0',
    primaryContainer: '#B3E5FC',
    onPrimaryContainer: '#01579B',
  },
  roundness: 12,
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#64B5F6',
    secondary: '#FFB74D',
    tertiary: '#81C784',
    error: '#EF5350',
    errorContainer: '#5D1F1F',
    onErrorContainer: '#FFCDD2',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#B0B0B0',
    outline: '#3F3F3F',
    outlineVariant: '#2A2A2A',
    primaryContainer: '#0D47A1',
    onPrimaryContainer: '#E3F2FD',
  },
  roundness: 12,
};

export const ThemeProvider = ({ children }) => {
  const sys = useColorScheme();
  const [isDark, setIsDark] = useState(false);
  const [themeMode, setThemeMode] = useState('system');

  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    setIsDark(themeMode === 'system' ? sys === 'dark' : themeMode === 'dark');
  }, [themeMode, sys]);

  const load = async () => {
    try {
      const s = await AsyncStorage.getItem('themeMode');
      if (s) setThemeMode(s);
    } catch (_) {}
  };
  const save = async (m) => {
    try {
      await AsyncStorage.setItem('themeMode', m);
      setThemeMode(m);
    } catch (_) {}
  };
  const toggleTheme = () => save(isDark ? 'light' : 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, themeMode, toggleTheme, setThemeMode: save, colors: theme.colors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be within ThemeProvider');
  return ctx;
};
