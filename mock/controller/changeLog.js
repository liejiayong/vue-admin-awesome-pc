const data = [
  {
    content: '项目调整',
    timestamp: '2020-10-02',
  },
];

module.exports = [
  {
    url: '/changeLog/getList',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        totalCount: 999,
        data: data,
      };
    },
  },
];
