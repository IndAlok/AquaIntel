import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, useTheme, Snackbar, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../store/AuthContext';

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const { login, firebaseDisabled, signInWithGoogle, googleLoading, googleAuthAvailable } = useAuth();
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
    if (!result.success) setError(result.error || 'Login failed');
  };

  const handleDemoLogin = async () => {
    const demoEmail = process.env.EXPO_PUBLIC_DEMO_EMAIL || 'demo@aquaintel.gov.in';
    const demoPassword = process.env.EXPO_PUBLIC_DEMO_PASSWORD || 'AquaIntel@2025';
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    const result = await login(demoEmail, demoPassword);
    setLoading(false);
    if (!result.success) setError('Demo account not available. Please sign up.');
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.error || 'Google Sign-In failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="water" size={80} color={theme.colors.primary} />
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
            Welcome Back
          </Text>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Sign in to continue to AquaIntel
          </Text>
          {firebaseDisabled && (
            <Chip mode="outlined" style={styles.chip} textStyle={{ color: theme.colors.error }}>
              Auth disabled: add Firebase env
            </Chip>
          )}
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
            disabled={firebaseDisabled}
            style={styles.button}
          >
            Login
          </ThemedButton>
          <ThemedButton
            mode="outlined"
            onPress={handleDemoLogin}
            disabled={loading || firebaseDisabled}
            style={styles.button}
          >
            Try Demo Account
          </ThemedButton>
          <View style={styles.dividerContainer}>
            <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
            <Text variant="bodyMedium" style={[styles.dividerText, { color: theme.colors.onSurfaceVariant }]}>
              or
            </Text>
            <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          </View>
          {googleAuthAvailable && (
            <ThemedButton
              mode="outlined"
              onPress={handleGoogleSignIn}
              loading={googleLoading}
              disabled={loading || firebaseDisabled || googleLoading}
              style={styles.button}
              icon={() => <MaterialCommunityIcons name="google" size={20} color={theme.colors.primary} />}
            >
              Continue with Google
            </ThemedButton>
          )}
          <View style={styles.signupRow}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
              Don't have an account?{' '}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </Text>
          </View>
        </View>
        <Text variant="bodySmall" style={[styles.footer, { color: theme.colors.onSurfaceVariant }]}>
          Ministry of Jal Shakti{'\n'}Government of India
        </Text>
      </ScrollView>
      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
        action={{ label: 'OK', onPress: () => setError('') }}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollContent: { 
    flexGrow: 1, 
    padding: 24 
  },
  header: { 
    alignItems: 'center', 
    marginTop: 48, 
    marginBottom: 32 
  },
  title: { 
    marginTop: 16, 
    fontWeight: 'bold' 
  },
  subtitle: { 
    marginTop: 8 
  },
  chip: {
    marginTop: 12
  },
  form: { 
    flex: 1 
  },
  input: { 
    marginBottom: 16 
  },
  button: { 
    marginTop: 8 
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: { 
    flex: 1, 
    height: 1 
  },
  dividerText: { 
    marginHorizontal: 16 
  },
  signupRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 24 
  },
  footer: { 
    textAlign: 'center', 
    marginTop: 32 
  },
});

export default LoginScreen;
