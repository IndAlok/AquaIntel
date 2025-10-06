// metro.config.js - FORCE FRESH BUNDLES - NO CACHE
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// CRITICAL: Force complete cache reset to fix Reanimated bundling issues
config.resetCache = true;
config.cacheStores = []; // EMPTY - No caching whatsoever

// Basic transformer config - NO complex optimizations
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
