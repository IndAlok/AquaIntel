import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../store/AuthContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator = () => {
  const t = useTheme();
  const { user, loading, isFirstLaunch } = useAuth();

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: t.colors.background }]}>
        <ActivityIndicator size="large" color={t.colors.primary} />
      </View>
    );
  }

  if (!user || isFirstLaunch) return <AuthNavigator />;
  return <AppNavigator />;
};

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default RootNavigator;
