const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken',
};

module.exports = [
  {
    url: '/publicKey',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB',
        },
      };
    },
  },
  {
    url: '/login',
    type: 'post',
    response(config) {
      const { userName } = config.body;

      const accessToken = accessTokens[userName];
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        };
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken },
      };
    },
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功',
      };
    },
  },
  {
    url: '/userInfo',
    type: 'post',
    response(config) {
      const { accessToken } = config.body;
      let permissions = ['admin'];
      let userName = 'admin';
      if ('admin-accessToken' === accessToken) {
        permissions = ['admin'];
        userName = 'admin';
      }
      if ('editor-accessToken' === accessToken) {
        permissions = ['editor'];
        userName = 'editor';
      }
      if ('test-accessToken' === accessToken) {
        permissions = ['admin', 'editor'];
        userName = 'test';
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          permissions,
          userName,
          'avatar|1': [
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
          ],
        },
      };
    },
  },
  {
    url: '/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
];
