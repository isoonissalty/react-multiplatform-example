const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    watchFolders: [path.resolve(__dirname, '../shared')],
    resolver: {
      extraNodeModules: {
        '@root/shared': path.resolve(__dirname, '../shared/src'),
      },
      sourceExts,
      assetExts,
    },
  };
})();
