import React, { createContext, useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  getIdToken,
} from 'firebase/auth';
import { auth, firebaseDisabled, signInWithGoogleWeb, db } from '../services/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// Google Sign-In is available on web platform (uses Firebase popup auth)
const isWebPlatform = Platform.OS === 'web';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    checkFirstLaunch();
    if (firebaseDisabled) {
      setUser(null);
      setLoading(false);
      return () => {};
    }

    // Firebase Auth state listener with token refresh
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Verify the user's token is valid
        try {
          await getIdToken(firebaseUser, true); // Force refresh to validate
          setUser(firebaseUser);
          setAuthError(null);

          // Update last login in Firestore (if db is available)
          if (db) {
            try {
              const userRef = doc(db, 'users', firebaseUser.uid);
              await setDoc(
                userRef,
                {
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  lastLogin: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                },
                { merge: true }
              );
            } catch (e) {
              // Firestore update is optional, don't fail auth
              console.warn('Could not update user profile:', e.message);
            }
          }
        } catch (e) {
          // Token invalid, sign out
          console.error('Token validation failed:', e.message);
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('hasLaunched');
      setIsFirstLaunch(value === null);
    } catch (e) {
      setIsFirstLaunch(true);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      setIsFirstLaunch(false);
    } catch (e) {
      setIsFirstLaunch(false);
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const isValidPassword = (password) => {
    return password && password.length >= 8;
  };

  const signup = async (email, password, name) => {
    if (firebaseDisabled) return { success: false, error: 'Authentication is disabled' };

    // Input validation
    if (!email || !isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    if (!isValidPassword(password)) {
      return { success: false, error: 'Password must be at least 8 characters' };
    }
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name' };
    }

    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: name.trim() });

      // Create user profile in Firestore
      if (db) {
        try {
          const userRef = doc(db, 'users', credential.user.uid);
          await setDoc(userRef, {
            email: email.trim(),
            displayName: name.trim(),
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            role: 'user', // Default role
          });
        } catch (e) {
          console.warn('Could not create user profile:', e.message);
        }
      }

      return { success: true, user: credential.user };
    } catch (e) {
      const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password is too weak',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled',
      };
      return { success: false, error: errorMessages[e.code] || e.message };
    }
  };

  const login = async (email, password) => {
    if (firebaseDisabled) return { success: false, error: 'Authentication is disabled' };

    // Input validation
    if (!email || !isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password' };
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      return { success: true, user: credential.user };
    } catch (e) {
      const errorMessages = {
        'auth/invalid-credential': 'Invalid email or password',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later',
      };
      return { success: false, error: errorMessages[e.code] || e.message };
    }
  };

  const signInWithGoogle = async () => {
    if (firebaseDisabled) {
      return { success: false, error: 'Authentication is disabled. Check Firebase configuration.' };
    }

    try {
      setGoogleLoading(true);
      setAuthError(null);

      if (Platform.OS === 'web') {
        const result = await signInWithGoogleWeb();

        // Create/update user profile in Firestore
        if (db && result.user) {
          try {
            const userRef = doc(db, 'users', result.user.uid);
            const userDoc = await getDoc(userRef);

            await setDoc(
              userRef,
              {
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                lastLogin: serverTimestamp(),
                updatedAt: serverTimestamp(),
                ...(userDoc.exists()
                  ? {}
                  : {
                      createdAt: serverTimestamp(),
                      role: 'user',
                    }),
              },
              { merge: true }
            );
          } catch (e) {
            console.warn('Could not update user profile:', e.message);
          }
        }

        return { success: true, user: result.user };
      }
      return { success: false, error: 'Google Sign-In is only available on web' };
    } catch (e) {
      console.error('Google Sign-In Error:', e.code, e.message);

      const errorMessages = {
        'auth/popup-closed-by-user': 'Sign-in was cancelled',
        'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site',
        'auth/cancelled-popup-request': 'Sign-in was cancelled',
        'auth/unauthorized-domain':
          'This domain is not authorized for Google Sign-In. Please contact support.',
        'auth/operation-not-allowed': 'Google Sign-In is not enabled. Please contact support.',
        'auth/account-exists-with-different-credential':
          'An account already exists with this email',
        'auth/network-request-failed': 'Network error. Please check your connection',
        'auth/argument-error': 'Firebase configuration error. Please check your setup.',
      };

      const errorMessage = errorMessages[e.code] || e.message || 'Google sign-in failed';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setGoogleLoading(false);
    }
  };

  const logout = async () => {
    if (firebaseDisabled) return { success: true };
    try {
      await signOut(auth);
      setUser(null);
      setAuthError(null);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // Get current user's ID token for API calls
  const getAuthToken = async () => {
    if (!user) return null;
    try {
      return await getIdToken(user, true);
    } catch (e) {
      console.error('Failed to get auth token:', e.message);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirstLaunch,
        firebaseDisabled,
        googleLoading,
        googleAuthAvailable: isWebPlatform && !firebaseDisabled,
        authError,
        signup,
        login,
        logout,
        signInWithGoogle,
        completeOnboarding,
        getAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
