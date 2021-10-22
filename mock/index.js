const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const { mock } = require('mockjs');
const { handleMockArray } = require('./utils');
const mockDir = path.join(process.cwd(), 'mock');

const baseURL = process.env.VUE_APP_BASE_URL;
// console.log(process.env.NODE_ENV, ' mock server baseURL', baseURL);

/**
 *
 * @param url
 * @param type
 * @param respond
 * @returns {{response(*=, *=): void, type: (*|string), url: RegExp}}
 */
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${baseURL}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log(chalk.green(`> 请求===========`));
      res.status(200);
      if (JSON.stringify(req.body) !== '{}') {
        console.log(chalk.green(`> 请求地址：${req.path}`));
        console.log(chalk.green(`> 请求参数：${JSON.stringify(req.body)}\n`));
      } else {
        console.log(chalk.green(`> 请求地址：${req.path}\n`));
      }
      res.json(mock(respond instanceof Function ? respond(req, res) : respond));
    },
  };
};
/**
 *
 * @param app
 * @returns {{mockStartIndex: number, mockRoutesLength: number}}
 */
function registerRoutes(app) {
  let mockLastIndex;
  const mocks = [],
    mockArray = handleMockArray();
  mockArray.forEach((item) => {
    mocks.push(...require(item));
  });
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response);
  });
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

/**
 *
 * @param app
 */
// vue@3.x.x版本以上后，vue学院开始模块编译，才能在nodejs中实用es6语法
// process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;
module.exports = (app) => {
  // require('@babel/register'); // 让nodejs中实用es6语法
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  // 注册自定义 mock 数据
  const mockRoutes = registerRoutes(app);

  // 监听mock数据文件变化，文件改变或新增则重新注册新路由
  let mockRoutesLength = mockRoutes.mockRoutesLength;
  let mockStartIndex = mockRoutes.mockStartIndex;
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event) => {
      if (event === 'change' || event === 'add') {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          Object.keys(require.cache).forEach((item) => {
            if (item.includes(mockDir)) {
              delete require.cache[require.resolve(item)];
            }
          });
          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;
        } catch (error) {
          console.log(chalk.red(error));
        }
      }
    });
};
