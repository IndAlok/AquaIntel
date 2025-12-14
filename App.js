import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox, Platform } from 'react-native';
import { AuthProvider } from './store/AuthContext';
import { ThemeProvider, useAppTheme } from './store/ThemeContext';
import RootNavigator from './navigation/RootNavigator';

if (Platform.OS === 'web') {
  LogBox.ignoreLogs([
    'shadow*',
    'props.pointerEvents',
    '[Reanimated]',
    'useNativeDriver',
    'Animated:',
    'NativeAnimatedHelper',
  ]);
  const origWarn = console.warn;
  console.warn = (...args) => {
    const msg = args[0];
    if (
      typeof msg === 'string' &&
      (msg.includes('shadow') ||
        msg.includes('pointerEvents') ||
        msg.includes('useNativeDriver') ||
        msg.includes('Animated'))
    )
      return;
    origWarn(...args);
  };
}

function AppContent() {
  const { theme, isDark } = useAppTheme();
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
