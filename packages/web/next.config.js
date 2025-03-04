const path = require('path');

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@react-multiplatform-example/shared'],
  webpack: config => {
    // Let webpack resolve modules in the shared package
    config.resolve.alias = {
      ...config.resolve.alias,
      '@root/shared': path.resolve(__dirname, '../shared/src'),
    };

    return config;
  },
};
