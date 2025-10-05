// components/AnimatedScreenWrapper.jsx
// Wrapper component to add entrance animations to screens

import React from 'react';
import * as Animatable from 'react-native-animatable';

const AnimatedScreenWrapper = ({ children, animation = 'fadeIn', duration = 300, delay = 0 }) => {
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      delay={delay}
      style={{ flex: 1 }}
      useNativeDriver
    >
      {children}
    </Animatable.View>
  );
};

export default AnimatedScreenWrapper;
