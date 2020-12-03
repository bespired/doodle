const path = require('path');

module.exports = {
  publicPath: '/admin/',
  chainWebpack: (config) => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true,
    });
    config.resolve.alias
    	.set('@',        path.resolve(__dirname, 'src'))
      .set('@doodle',  path.resolve(__dirname, 'src/doodledesign'))
      .set('@dragrr',  path.resolve(__dirname, 'src/doodledragrr'))
      .set('vue$',     path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'))
  },
  crossorigin: 'anonymous',
};

