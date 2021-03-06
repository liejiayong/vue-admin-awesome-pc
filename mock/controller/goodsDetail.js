const { mock } = require('mockjs');

module.exports = [
  {
    url: '/goodsDetail/getList',
    type: 'post',
    response: (config) => {
      return {
        code: 200,
        msg: 'success',
        totalCount: 999,
        data: mock({
          'data|10': [
            {
              id: '@id',
            },
          ],
        }).data,
        config,
      };
    },
  },
  {
    url: '/goodsDetail/doEdit',
    type: 'post',
    response: (config) => {
      return {
        code: 200,
        msg: '模拟保存成功',
        config,
      };
    },
  },
  {
    url: '/goodsDetail/doDelete',
    type: 'post',
    response: (config) => {
      return {
        code: 200,
        msg: '模拟删除成功',
        config,
      };
    },
  },
];
