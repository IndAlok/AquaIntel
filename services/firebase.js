// services/firebase.js
// Firebase configuration and initialization for authentication and database

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

// Firebase configuration from environment variables
// Priority: 1. Constants.expoConfig.extra (works in builds)
//          2. process.env (works in development)

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.firebaseAppId || process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Validate Firebase configuration
const validateConfig = () => {
  console.log('🔍 Debugging Firebase Config:');
  console.log('  Constants.expoConfig.extra:', Constants.expoConfig?.extra ? 'EXISTS' : 'MISSING');
  console.log('  firebaseApiKey from extra:', Constants.expoConfig?.extra?.firebaseApiKey);
  console.log('  firebaseApiKey from process.env:', process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
  console.log('  Final firebaseConfig:', {
    apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'MISSING',
    authDomain: firebaseConfig.authDomain || 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING'
  });
  
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);
  
  if (missingKeys.length > 0) {
    console.error('❌ FIREBASE CONFIGURATION ERROR');
    console.error('Missing configuration fields:', missingKeys);
    console.error('\n📝 IMPORTANT: Environment variables are bundled at BUILD TIME!');
    console.error('📦 If you updated .env after building, you must REBUILD the app.');
    console.error('🔧 Run: npx eas build -p android --profile preview');
    
    throw new Error('Firebase configuration incomplete. Rebuild the app after updating .env file.');
  }
  
  console.log('✅ Firebase config validation passed');
};

// Validate before initializing
validateConfig();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log('✅ Firebase initialized successfully');
console.log('📊 Project ID:', firebaseConfig.projectId);

export default app;
