module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'react',
          lazyImports: true, // Enable lazy loading for faster startup
        }
      ]
    ],
    plugins: [
      'react-native-reanimated/plugin', // Must be last
    ],
    env: {
      production: {
        plugins: [
          'transform-remove-console', // Remove console.logs in production
        ],
      },
    },
  };
};
