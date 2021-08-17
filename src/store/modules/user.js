import Vue from 'vue';
import { getInfo, login, logout } from '@/api/user';
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/accessToken';
import { resetRouter } from '@/router';
import opts from '@/config/settings';

const { title, tokenName } = opts;

const state = {
  accessToken: getAccessToken(),
  userName: '',
  avatar: '',
  permissions: [],
};

const getters = {
  accessToken: (state) => state.accessToken,
  userName: (state) => state.userName,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  setAvatar(state, avater) {
    state.avatar = avater;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};

const actions = {
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo);
    const accessToken = data[tokenName];
    if (accessToken) {
      console.log('login accessToken', accessToken);
      commit('setAccessToken', accessToken);
      const hour = new Date().getHours();
      const time =
        hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour <= 18 ? '下午好' : '晚上好';
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${time}!`);
    } else {
      Vue.prototype.$baseNotify(`登录接口异常，未正确返回${tokenName}...`, `error`);
    }
  },
  async getInfo({ commit, state }) {
    const { data } = await getInfo(state.accessToken);
    if (!data) {
      Vue.prototype.$baseNotify('验证失败，请重新登录...', 'error');
      return false;
    }
    let { permissions, userName, avatar } = data;
    console.log('getInfo', data);
    if (permissions && userName) {
      commit('setPermissions', permissions);
      commit('setUserName', userName);
      commit('setAvatar', avatar);
      return permissions;
    } else {
      Vue.prototype.$baseNotify('获取用户信息接口异常', 'error');
      return false;
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken);
    await dispatch('tabsBar/delAllRoutes', null, { root: true });
    await dispatch('resetAccessToken');
    await resetRouter();
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', []);
    commit('setAccessToken', '');
    removeAccessToken();
  },
};

export default { state, getters, mutations, actions };
