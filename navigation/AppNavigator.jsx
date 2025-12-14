import React from 'react';
import { View } from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import AIAssistant from '../components/AIAssistant';
import { useAuth } from '../store/AuthContext';

const AppNavigator = () => {
  const { user } = useAuth();
  const ctx = {
    name: user?.displayName || 'User',
    email: user?.email,
    role: 'Citizen',
    region: 'India',
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerNavigator />
      <AIAssistant userContext={ctx} visible={true} />
    </View>
  );
};

export default AppNavigator;
