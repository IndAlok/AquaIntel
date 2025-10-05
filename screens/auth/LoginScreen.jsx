// screens/auth/LoginScreen.jsx
// Login screen with email/password authentication

import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, useTheme, Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../store/AuthContext';

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@aquaintel.gov.in');
    setPassword('demo123456');
    
    setLoading(true);
    const result = await login('demo@aquaintel.gov.in', 'demo123456');
    setLoading(false);

    if (!result.success) {
      setError('Demo account not available. Please sign up.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="water" size={80} color={theme.colors.primary} />
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
            Welcome Back
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Sign in to continue to AquaIntel
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
          />

          <ThemedButton
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          >
            Login
          </ThemedButton>

          <ThemedButton
            mode="outlined"
            onPress={handleDemoLogin}
            disabled={loading}
            style={styles.demoButton}
          >
            Try Demo Account
          </ThemedButton>

          <View style={styles.signupContainer}>
            <Text variant="bodyMedium">Don't have an account? </Text>
            <Text
              variant="bodyMedium"
              style={[styles.signupLink, { color: theme.colors.primary }]}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </Text>
          </View>
        </View>

        <Text variant="bodySmall" style={styles.footer}>
          Ministry of Jal Shakti{'\n'}
          Government of India
        </Text>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setError(''),
        }}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  demoButton: {
    marginTop: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupLink: {
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    marginTop: 32,
  },
});

export default LoginScreen;
