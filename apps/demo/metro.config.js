const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const workspaceRoot = path.resolve(__dirname, '../..');
const packagesPath = path.join(workspaceRoot, 'packages');

const config = {
  watchFolders: [packagesPath],
  resolver: {
    nodeModulesPaths: [
      path.join(__dirname, 'node_modules'),
      path.join(workspaceRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
