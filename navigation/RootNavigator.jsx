// navigation/RootNavigator.jsx
// Root navigator that decides whether to show Auth or App navigator

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../store/AuthContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator = () => {
  const { user, loading, isFirstLaunch } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show auth flow if no user or if it's first launch
  if (!user || isFirstLaunch) {
    return <AuthNavigator />;
  }

  // Show main app if user is logged in
  return <AppNavigator />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
