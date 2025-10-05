// components/ThemedButton.jsx
// Custom themed button component with proper layout

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '../store/ThemeContext';

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
  const { colors } = useAppTheme();

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
    minHeight: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
});

export default ThemedButton;
