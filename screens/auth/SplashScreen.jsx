// screens/auth/SplashScreen.jsx
// Animated splash screen with beautiful entrance animations

import React, { useEffect } from 'react';
import AnimatedSplash from '../../components/AnimatedSplash';

const SplashScreen = ({ navigation }) => {
  const handleFinish = () => {
    navigation.replace('Onboarding');
  };

  return <AnimatedSplash onFinish={handleFinish} />;
};

export default SplashScreen;
