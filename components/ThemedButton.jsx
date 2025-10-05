// components/ThemedButton.jsx
// Custom themed button component

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ThemedButton = ({ 
  children, 
  mode = 'contained', 
  style, 
  loading,
  disabled,
  icon,
  onPress,
  ...props 
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      icon={icon}
      style={[styles.button, style]}
      contentStyle={styles.content}
      labelStyle={styles.label}
      {...props}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  content: {
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ThemedButton;
