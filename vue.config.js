
const path = require('path')
const { title } = require("./src/config/settings");
const { version, author } = require("./package.json");
const WebpackBar = require('webpackbar')
const dayjs = require('dayjs');
process.env.VUE_APP_TITLE = title || "vue-admin-beautiful";
process.env.VUE_APP_AUTHOR = author || "chuzhixin";
process.env.VUE_APP_UPDATE_TIME = dayjs().format('YYYY-M-D HH:mm:ss');
process.env.VUE_APP_VERSION = version;
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    // runtimeCompiler: true,
    // productionSourceMap: false,
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
                new WebpackBar({
                    name: `vue-admin-awesome`
                })
            ]
        }
    },
    chainWebpack(config) {
        // config.module
        //     .rule("svg")
        //     .exclude.add(resolve("src/assets/svg"))
        //     .add(resolve("src/colorfulIcon"))
        //     .end();
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
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

    }
}
