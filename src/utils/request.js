import Vue from 'vue';
import axios from 'axios';
import opts from '@/config/settings';
import store from '@/store';
import qs from 'qs';
import router from '@/router';
import _ from 'lodash';
import { isArray } from '@/utils/validate';

const {
  baseURL,
  contentType,
  invalidCode,
  messageDuration,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName,
  debounce,
} = opts;

let loadingInstance;
/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleException = (code, msg) => {
  switch (code) {
    case invalidCode:
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error');
      store.dispatch('user/resetAccessToken').catch(() => {});
      if (loginInterception) {
        location.reload();
      }
      break;
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => {});
      break;
    default:
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error');
      break;
  }
};

const service = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
});

service.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken']) {
      config.headers[tokenName] = store.getters['user/accessToken'];
    }
    // 过滤所有为空、0、false的key，如果不需要请自行注释
    if (config.data) {
      config.data = Vue.prototype.$baseLodash.pickBy(config.data, Vue.prototype.$baseLodash.identity);
    }
    if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      config.data = qs.stringify(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();

    const { status, data, config } = response;
    const { code, msg } = data;
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]];

    if (codeVerificationArray.includes(code)) {
      return data;
    } else {
      handleException(code, msg);
      return Promise.reject(
        'vue-admin-beautiful请求异常拦截:' + JSON.stringify({ url: config.url, code, msg }) || 'Error'
      );
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === 'Network Error') {
        message = '后端接口连接异常';
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时';
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3);
        message = '后端接口' + code + '异常';
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error');
      return Promise.reject(error);
    }
  }
);
export default service;
