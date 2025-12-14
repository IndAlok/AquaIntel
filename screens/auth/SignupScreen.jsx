import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, useTheme, Snackbar, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../store/AuthContext';

const SignupScreen = ({ navigation }) => {
  const theme = useTheme();
  const { signup, firebaseDisabled, signInWithGoogle, googleLoading, googleAuthAvailable } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    const result = await signup(email, password, name);
    setLoading(false);
    if (!result.success) setError(result.error || 'Signup failed');
  };

  const handleGoogleSignUp = async () => {
    setError('');
    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.error || 'Google Sign-Up failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="account-plus" size={80} color={theme.colors.primary} />
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
            Create Account
          </Text>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Join the AquaIntel community
          </Text>
          {firebaseDisabled && (
            <Chip mode="outlined" style={styles.chip} textStyle={{ color: theme.colors.error }}>
              Signup disabled: add Firebase env
            </Chip>
          )}
        </View>
        <View style={styles.form}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={styles.input}
          />
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
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock-check" />}
            style={styles.input}
          />
          <ThemedButton
            onPress={handleSignup}
            loading={loading}
            disabled={firebaseDisabled}
            style={styles.button}
          >
            Sign Up
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
              onPress={handleGoogleSignUp}
              loading={googleLoading}
              disabled={loading || firebaseDisabled || googleLoading}
              style={styles.button}
              icon={() => <MaterialCommunityIcons name="google" size={20} color={theme.colors.primary} />}
            >
              Continue with Google
            </ThemedButton>
          )}
          <View style={styles.loginRow}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
              Already have an account?{' '}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </View>
        </View>
        <Text variant="bodySmall" style={[styles.footer, { color: theme.colors.onSurfaceVariant }]}>
          By signing up, you agree to our Terms{'\n'}and Privacy Policy
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
    marginTop: 24, 
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
  loginRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 24 
  },
  footer: { 
    textAlign: 'center', 
    marginTop: 32 
  },
});

export default SignupScreen;
