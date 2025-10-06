/**
 * Metro configuration for React Native with Reanimated 3
 * This configuration FORCES cache reset and prevents legacy Reanimated code
 */

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// CRITICAL: Always reset cache to prevent stale Reanimated code
config.resetCache = true;

// Force clear transformer cache
config.cacheStores = [];

// Optimize transformer for Reanimated 3
config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
  babelTransformerPath: require.resolve('react-native-reanimated/plugin'),
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
