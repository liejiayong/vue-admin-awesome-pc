/**
 * @copyright JyLie 809206619@qq.com
 * @description 导入所有 controller 模块，npm run serve时在node环境中自动输出controller文件夹下Mock接口，请勿修改。
 */

// const chalk = require('chalk');
// const fs = require('fs');
// const { baseURL, devPort, httpRequestFile } = require('../src/config/settings');
const { handleMockArray } = require('./utils');

const mocks = [];
const mockArray = handleMockArray();
mockArray.forEach((item) => {
  const obj = require(item);
  mocks.push(...obj);
});

// console.log('mockArray', mockArray);
// mockArray.forEach(async (item) => {
//   const obj = require(item);
//   await mocks.push(...obj);
//   if (httpRequestFile) {
//     obj.forEach((item) => {
//       fs.appendFile(
//         './http/mock.http',
//         `\r\n###${item.url}###\r\POST http://localhost:${devPort}/${baseURL}${item.url}\r\nContent-Type: application/x-www-form-urlencoded\r\n###\r\n`,
//         (error) => {
//           if (error)
//             return chalk.red(`\n > 追加HTTP Request失败${error.message}`);
//         }
//       );
//     });
//   }
// });
module.exports = {
  mocks,
};
