/*
 * @Description: 配置webpack打包版本策略
 * @version:
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2021-11-18 16:42:44
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2022-02-11 17:57:34
 * @FilePath: \vue-admin-awesome-pc\scripts\systemUpdate.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const path = require('path');
const fs = require('fs');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const pkg = require('../package.json');

const resolve = (dir) => path.join(__dirname, dir);
const timeStamp = Date.now();
const gitRevisionPlugin = new GitRevisionPlugin(); // 依赖 git-revision-webpack-plugin

// 时间戳
exports.timeStamp = timeStamp;

/**
 * 生成版本文件
 */
exports.genVersionFile = () => {
  const VERSION = `${gitRevisionPlugin.branch()}_${
    pkg.version
  }_${gitRevisionPlugin.version()}_${gitRevisionPlugin.commithash()}_${timeStamp}`; // git分支+时间戳；这里可以根据自己喜欢的方式加上随机版本号
  const path = `../public/config.json`;
  if (!fs.existsSync(path)) {
    fs.writeFileSync(resolve(path), JSON.stringify({}));
  }
  const configJSON = require(resolve(path)); // public文件夹下新建config.json
  const configFile = resolve(path);
  fs.writeFileSync(
    configFile,
    JSON.stringify(
      {
        ...configJSON,
        code: 0,
        msg: '请求成',
        data: null,
        version: VERSION,
      },
      null,
      2
    )
  );
};

/**
 * 输出重构 打包编译后的js文件名称,添加时间戳.
 * @param {object} config
 */
exports.configureOutputFilename = (config) => {
  config.output.filename = `[name][contenthash:8]${timeStamp}.js`;
  config.output.chunkFilename = `[id][contenthash:8].js`; // 不需要设置，使用chunkhash来判断
};
exports.configureOutputFilenameMap = {
  filename: `[name][contenthash:8]${timeStamp}.js`,
  // chunkFilename: `[id][contenthash:8].js`, // 不需要设置，使用chunkhash来判断
};
