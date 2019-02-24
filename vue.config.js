const name = require('./package.json').name;
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: IS_PROD ? `/${name}/` : '/',
  outputDir: 'docs',
};
