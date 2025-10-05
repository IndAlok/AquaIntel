// services/firebase.js
// Firebase configuration and initialization for authentication and database

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration from environment variables
// IMPORTANT: Set these in your .env file!
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Validate Firebase configuration
const validateConfig = () => {
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);
  
  if (missingKeys.length > 0) {
    console.error('❌ FIREBASE CONFIGURATION ERROR');
    console.error('Missing required environment variables:');
    missingKeys.forEach(key => {
      const envVarName = `EXPO_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
      const value = process.env[envVarName];
      console.error(`  - ${envVarName}: ${value ? 'SET' : 'MISSING/EMPTY'}`);
    });
    console.error('\n📝 IMPORTANT: Environment variables are bundled at BUILD TIME!');
    console.error('📦 If you updated .env after building, you must REBUILD the app.');
    console.error('🔧 Run: npx eas build -p android --profile preview');
    console.error('📖 See FIREBASE_SETUP.md for detailed instructions.\n');
    
    throw new Error('Firebase configuration incomplete. Rebuild the app after updating .env file.');
  }
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
