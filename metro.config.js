const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
      extraNodeModules: {
        'src': path.resolve(__dirname, './src'),
        'types': path.resolve(__dirname, './types'),
        'data': path.resolve(__dirname, './data'),
        'context': path.resolve(__dirname, './src/context'),
        'components': path.resolve(__dirname, './src/components'),
        'navigation': path.resolve(__dirname, './src/navigation'),
        'hooks': path.resolve(__dirname, './src/hooks'),
        'screens': path.resolve(__dirname, './src/screens'),
        'services': path.resolve(__dirname, './src/services'),
        'store': path.resolve(__dirname, './src/store'),
        'styles': path.resolve(__dirname, './src/styles'),
        'utils': path.resolve(__dirname, './src/utils'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
