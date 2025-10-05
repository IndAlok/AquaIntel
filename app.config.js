// app.config.js
// Dynamic configuration that supports environment variables

module.exports = ({ config }) => {
  return {
    ...config,
    name: "AquaIntel",
    slug: "aquaintel",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/logo.png",
      resizeMode: "contain",
      backgroundColor: "#FF9933"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.aquaintel.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#FF9933"
      },
      package: "com.aquaintel.app"
    },
    web: {
      favicon: "./assets/logo.png"
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 35,  // UPDATED: Required by androidx.core:core:1.16.0
            targetSdkVersion: 34,   // Keep at 34 for compatibility
            minSdkVersion: 24,      // CRITICAL: Must be 24 for Hermes hermestooling compatibility
            buildToolsVersion: "35.0.0",  // UPDATED: Matches compileSdk
            usesCleartextTraffic: true,
            enableProguardInReleaseBuilds: true,
            enableHermes: true
          },
          ios: {
            deploymentTarget: "15.1"
          }
        }
      ],
      "expo-font"
    ],
    extra: {
      // Firebase configuration exposed to app
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      
      // Demo credentials
      demoEmail: process.env.EXPO_PUBLIC_DEMO_EMAIL,
      demoPassword: process.env.EXPO_PUBLIC_DEMO_PASSWORD,
      
      // App settings
      useRealData: process.env.EXPO_PUBLIC_USE_REAL_DATA,
      enableOfflineMode: process.env.EXPO_PUBLIC_ENABLE_OFFLINE_MODE,
      
      // EAS project ID
      eas: {
        projectId: "c8380ef2-81a3-4816-9cf7-9c722ea15087"
      }
    }
  };
};
