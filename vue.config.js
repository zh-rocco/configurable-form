const name = require('./package.json').name;
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: IS_PROD ? `/${name}/` : '/',
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      // runtimeChunk: true,
      moduleIds: 'hashed',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          codemirror: {
            name: 'chunk-codemirror',
            priority: 10,
            test: /[\\/]node_modules[\\/]codemirror[\\/]/,
          },
          'element-ui': {
            name: 'chunk-element-ui',
            priority: 20,
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          },
        },
      },
    },
  },
};
