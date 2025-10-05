// metro.config.js - HEAVILY OPTIMIZED for speed and size
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Optimization: Enable aggressive minification in production
config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
  minifierConfig: {
    // Terser options for maximum compression
    compress: {
      drop_console: true, // Remove ALL console.logs in production
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn', 'console.error'],
      passes: 3, // Multiple passes for better compression
      dead_code: true,
      conditionals: true,
      comparisons: true,
      evaluate: true,
      booleans: true,
      loops: true,
      unused: true,
      hoist_funs: true,
      hoist_vars: false,
      if_return: true,
      join_vars: true,
      side_effects: true,
      warnings: false,
    },
    mangle: {
      keep_fnames: false, // Mangle function names for smaller size
      toplevel: true,
    },
    output: {
      comments: false, // Remove ALL comments
      ascii_only: true,
      beautify: false,
    },
  },
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true, // Inline requires for better tree-shaking
    },
  }),
};

// Optimization: Better caching for faster rebuilds
config.cacheStores = [
  ...config.cacheStores,
];

// Optimization: Exclude unnecessary files from bundling
config.resolver = {
  ...config.resolver,
  blockList: [
    // Exclude test files
    /.*\/__tests__\/.*/,
    /.*\/__mocks__\/.*/,
    /.*\.test\.(js|jsx|ts|tsx)$/,
    /.*\.spec\.(js|jsx|ts|tsx)$/,
    // Exclude documentation
    /.*\.md$/,
    // Exclude IDE files
    /.*\.idea\/.*/,
    /.*\.vscode\/.*/,
  ],
  sourceExts: [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'],
  assetExts: config.resolver.assetExts.filter(ext => !['md', 'txt', 'log'].includes(ext)),
};

// Optimization: Faster asset serving
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Enable compression
      res.setHeader('Content-Encoding', 'gzip');
      return middleware(req, res, next);
    };
  },
};

// Optimization: Faster watching
config.watchFolders = [];

module.exports = config;
