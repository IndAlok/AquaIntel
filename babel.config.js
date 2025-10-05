module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'react',
          lazyImports: true,
        }
      ]
    ],
    plugins: [
      'react-native-reanimated/plugin', // Must be last
    ],
  };
};
