module.exports = ({ config }) => {
  return {
    ...config,
    name: 'AquaIntel',
    slug: 'aquaintel',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/logo.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/logo.png',
      resizeMode: 'contain',
      backgroundColor: '#FF9933',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.aquaintel.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/logo.png',
        backgroundColor: '#FF9933',
      },
      package: 'com.aquaintel.app',
    },
    web: {
      favicon: './assets/logo.png',
      bundler: 'metro',
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 34,
            minSdkVersion: 24,
            buildToolsVersion: '35.0.0',
            usesCleartextTraffic: true,
            enableProguardInReleaseBuilds: true,
            enableHermes: true,
            enableShrinkResourcesInReleaseBuilds: true,
            useLegacyPackaging: false,
            networkInspector: false,
            extraProguardRules:
              '-keep class com.facebook.hermes.unicode.** { *; }\n-keep class com.facebook.jni.** { *; }\n-dontwarn com.facebook.react.**',
            packagingOptions: {
              pickFirst: ['lib/arm64-v8a/libc++_shared.so'],
              exclude: [
                'lib/x86/**',
                'lib/x86_64/**',
                'lib/armeabi-v7a/**',
                'lib/armeabi/**',
                'lib/mips/**',
                'lib/mips64/**',
              ],
            },
          },
          ios: {
            deploymentTarget: '15.1',
          },
        },
      ],
      'expo-font',
    ],
    extra: {
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,

      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,

      geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,

      demoEmail: process.env.EXPO_PUBLIC_DEMO_EMAIL,
      demoPassword: process.env.EXPO_PUBLIC_DEMO_PASSWORD,

      useRealData: process.env.EXPO_PUBLIC_USE_REAL_DATA,
      enableOfflineMode: process.env.EXPO_PUBLIC_ENABLE_OFFLINE_MODE,

      eas: {
        projectId: 'c8380ef2-81a3-4816-9cf7-9c722ea15087',
      },
    },
  };
};
