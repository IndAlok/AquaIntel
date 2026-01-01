import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    Constants.expoConfig?.extra?.firebaseAuthDomain || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:
    Constants.expoConfig?.extra?.firebaseProjectId || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    Constants.expoConfig?.extra?.firebaseStorageBucket ||
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseMessagingSenderId ||
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.firebaseAppId || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfigKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];
const missingKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);
let firebaseDisabled = missingKeys.length > 0;

let app = null;
let auth = null;
let db = null;
let storage = null;
let googleProvider = null;

if (!firebaseDisabled) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    if (Platform.OS === 'web') {
      auth = getAuth(app);
    } else {
      try {
        auth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        });
      } catch (e) {
        auth = getAuth(app);
      }
    }

    googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');

    try {
      db = getFirestore(app);
    } catch (e) {
      db = null;
    }

    try {
      storage = getStorage(app);
    } catch (e) {
      storage = null;
    }
  } catch (e) {
    console.error('Firebase initialization error:', e);
    firebaseDisabled = true;
  }
}

const signInWithGoogleWeb = async () => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }
  if (!googleProvider) {
    throw new Error('Google Provider not initialized');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error('signInWithPopup error:', error.code, error.message);
    throw error;
  }
};

const signInWithGoogleToken = async (idToken) => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(auth, credential);
};

export default app;
export {
  auth,
  db,
  storage,
  firebaseDisabled,
  googleProvider,
  signInWithGoogleWeb,
  signInWithGoogleToken,
  GoogleAuthProvider,
};
