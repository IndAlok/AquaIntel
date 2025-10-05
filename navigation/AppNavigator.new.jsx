// navigation/AppNavigator.jsx
// Main app navigator with drawer navigation and AI Assistant

import React from 'react';
import { View } from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import AIAssistant from '../components/AIAssistant';
import { useAuth } from '../store/AuthContext';

const AppNavigator = () => {
  const { user } = useAuth();

  // User context for AI Assistant
  const userContext = {
    name: user?.displayName || 'User',
    email: user?.email,
    role: 'Citizen',
    region: 'India',
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main drawer navigation */}
      <DrawerNavigator />
      
      {/* Floating AI Assistant - available on all screens */}
      <AIAssistant userContext={userContext} visible={true} />
    </View>
  );
};

export default AppNavigator;
