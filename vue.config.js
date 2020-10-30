const path = require('path');
const {
  title,
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devPort,
  providePlugin,
} = require('./src/config/settings');
const { version, author } = require('./package.json');
const Webpack = require('webpack');
const WebpackBar = require('webpackbar');
// const WebpackAnalyzer = require('webpack-bundle-analyzer')
const dayjs = require('dayjs');
process.env.VUE_APP_TITLE = title || 'vue-admin-awesome';
process.env.VUE_APP_AUTHOR = author || 'JyLie';
process.env.VUE_APP_UPDATE_TIME = dayjs().format('YYYY-M-D HH:mm:ss');
process.env.VUE_APP_VERSION = version;

const resolve = (dir) => path.join(__dirname, dir);
const mockServer = () => {
  if (process.env.NODE_ENV === 'development')
    return require('./mock/mockServer.js');
  else return '';
};

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: false,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    after: mockServer(),
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /*sass-loader 8.0语法 */
        //prependData: '@import "~@/styles/variables.scss";',

        /*sass-loader 9.0写法，感谢github用户 shaonialife*/
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);
          if (
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content;
          }
          return content;
        },
      },
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '^': resolve('src/components'),
        },
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({
          name: `vue-admin-awesome`,
        }),
        // new WebpackAnalyzer()
      ],
    };
  },
  chainWebpack(config) {
    // config.module.rules.delete('svg'); //重点:删除默认配置中处理svg,
    // config.module
    //   .rule('svg-sprite-loader')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/assets/svg')) //处理svg目录
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'svg-icon-[name]',
    //   });
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end();
    config.module
      .rule('remixIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-icon-[name]' })
      .end();

    config
      .plugin('banner')
      .use(Webpack.BannerPlugin, ['copyright:JyLie 809206619@qq.com']);
  },
};
