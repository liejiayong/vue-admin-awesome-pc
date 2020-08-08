const path = require('path')
const { title, publicPath, assetsDir, outputDir, lintOnSave, transpileDependencies, devPort, providePlugin } = require("./src/config/settings")
const { version, author } = require("./package.json")
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
// const WebpackAnalyzer = require('webpack-bundle-analyzer')
const dayjs = require('dayjs')
process.env.VUE_APP_TITLE = title || "vue-admin-awesome"
process.env.VUE_APP_AUTHOR = author || "JyLie"
process.env.VUE_APP_UPDATE_TIME = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_VERSION = version
function resolve(dir) {
    return path.join(__dirname, dir)
}
function mockServer() {
    if (process.env.NODE_ENV === 'development') {
        const mockServer = require('./mock/mockServer.js')
        return mockServer
    } else {
        return ''
    }
}
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
            errors: true
        },
        after: mockServer()

    },
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        requireModuleExtension: true,
        sourceMap: true,
        loaderOptions: {
            scss: {
                prependData: '@import "~@/styles/variables.scss";',
            },
        },
    },
    configureWebpack() {
        return {
            resolve: {
                alias: {
                    '@': resolve('src'),
                    '^': resolve('src/components')
                }
            },
            plugins: [
                new Webpack.ProvidePlugin(providePlugin),
                new WebpackBar({
                    name: `vue-admin-awesome`
                }),
                // new WebpackAnalyzer()
            ]
        }
    },
    chainWebpack(config) {
        // config.module
        //     .rule("svg")
        //     .exclude.add(resolve("src/assets/svg"))
        //     .add(resolve("src/colorfulIcon"))
        //     .end()
        config.module.rules.delete("svg") //重点:删除默认配置中处理svg,
        //const svgRule = config.module.rule('svg')
        //svgRule.uses.clear()
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/assets/svg')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'svg-icon-[name]'
            })

        config.plugin('banner').use(Webpack.BannerPlugin, ['copyright:JyLie 809206619@qq.com'])
    }
}
