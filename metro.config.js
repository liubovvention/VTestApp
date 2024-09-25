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
        'components': path.resolve(__dirname, './src/components'),
        'hooks': path.resolve(__dirname, './src/hooks'),
        'screens': path.resolve(__dirname, './src/screens'),
        'services': path.resolve(__dirname, './src/services'),
        'utils': path.resolve(__dirname, './src/utils'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
