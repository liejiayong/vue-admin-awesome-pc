const path = require('path');
const WebpackBar = require('webpackbar');
const Webpack = require('webpack');
const { version, author, name } = require('./package.json');
// const WebpackAnalyzer = require('webpack-bundle-analyzer')
const { genVersionFile, configureOutputFilenameMap } = require('./scripts/systemUpdate.js');

process.env.VUE_APP_TITLE = name || 'vue-admin-awesome-pc';
process.env.VUE_APP_AUTHOR = author || 'JyLie 809206619@qq.com';
// process.env.VUE_APP_UPDATE_TIME = time;
process.env.VUE_APP_VERSION = version;

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
const mockServer = () => {
  if (!IS_PROD) return require('./mock');
  else return () => {};
};

genVersionFile();
module.exports = {
  /* 从 Vue CLI 3.3 起已弃用baseUrl, 改用publicPath。
  且 publicPath会覆盖 .env等文件所设置的BASE_URL的值 */
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // 默认'/'，部署应用包时的基本 URL,
  outputDir: process.env.VUE_APP_OUTPUT_DIR, // 'dist', 生产环境构建文件的目录
  // assetsDir: "",  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  filenameHashing: false, // 打包的时候不使用hash值.因为我们有时间戳来确定项目的唯一性了.
  lintOnSave: true,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  // 进行编译的依赖
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  devServer: {
    open: false, // 是否打开浏览器
    host: 'localhost',
    port: 28888, // 代理断就
    https: false,
    hotOnly: false, // 热更新
    noInfo: false,
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    proxy: {
      // 设置代理
      '/upload': {
        target: 'http://192.168.10.8:3888/upload', //目标 API 地址
        ws: false, // 如果要代理 websockets
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', //这里理解成用/api代替target里面的地址，
        },
      },
      '/mock': {
        target: 'https://www.easy-mock.com/', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/mock': '/',
        },
      },
    },
    after: mockServer(),
  },

  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    extract: IS_PROD
      ? {
          filename: `css/[name].[contenthash:8].css`,
          chunkFilename: `css/[name].[contenthash:8].css`,
        }
      : false,
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
          if (relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss') {
            return '@import "~@/styles/variables.scss";' + content;
          }
          return content;
        },
      },
    },
  },
  configureWebpack() {
    return {
      output: {
        filename: configureOutputFilenameMap.filename,
        chunkFilename: configureOutputFilenameMap.chunkFilename,
      },
      resolve: {
        alias: {
          '@': resolve('src'),
          '^': resolve('src/components'),
        },
      },
      plugins: [
        // 需要自动注入并加载的模块
        new Webpack.ProvidePlugin({
          maptalks: 'maptalks',
          'window.maptalks': 'maptalks',
        }),
        new WebpackBar({
          name: `vue-admin-awesome`,
        }),
        // new WebpackAnalyzer()
      ],
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 6,
          maxInitialRequests: 4,
          automaticNameDelimiter: '~',
          cacheGroups: {
            common: {
              name: 'common',
              chunks: 'initial',
              minChunks: 2,
              maxInitialRequests: 6,
              minSize: 0,
              priority: -20,
              reuseExistingChunk: true,
              enforce: true,
            },
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: -10,
            },
            elementUI: {
              name: 'elementui',
              test: /[\\/]element-ui[\\/]/,
              chunks: 'all',
              priority: 0,
            },
          },
        },
      },
      externals: {
        // vue: 'Vue',
        // 'element-ui': 'ELEMENT',
        // 'vue-router': 'VueRouter',
        // vuex: 'Vuex',
        // axios: 'axios',
      },
    };
  },
  chainWebpack(config) {
    // config.plugins.delete("preload");
    config.plugins.delete('prefetch');
    config.resolve.alias.set('@', resolve('src'));

    //  修复 HMR(热更新)失效
    config.resolve.symlinks(true);

    //     // 添加别名
    // config.resolve.alias
    //   .set("vue$", "vue/dist/vue.esm.js")
    //   .set("@", resolve("src"))

    //  配置 externals 引入 cdn 资源
    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   css: ["//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"],
    //   js: [
    //     "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
    //     "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
    //     "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
    //     "//unpkg.com/axios@0.19.0/dist/axios.min.js",
    //     "//unpkg.com/element-ui@2.10.1/lib/index.js"
    //   ]
    // };
    // // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    // config.plugin("html").tap(args => {
    //   // html中添加cdn
    //   args[0].cdn = cdn;
    //   return args;
    // });

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    // config.plugin("html").tap(args => {
    //   // 修复 Lazy loading routes Error
    //   args[0].chunksSortMode = "none";
    //   return args;
    // });

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
    config.module
      .rule('colorfulIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/colorful'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-icon-[name]' })
      .end();

    config.plugin('banner').use(Webpack.BannerPlugin, ['copyright:JyLie 809206619@qq.com']);
  },
};
