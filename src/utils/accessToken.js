import cookie from 'js-cookie';
import opts from '@/config/settings';

const { storage, tokenTableName } = opts;

/**
 * @description: 获取accessToken
 * @param {type}
 * @return {String}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-07-16 16:07:13
 */
export function getAccessToken() {
  if (!storage) {
    return localStorage.getItem(tokenTableName);
  }

  if ('localStorage' === storage) {
    return localStorage.getItem(tokenTableName);
  } else if ('sessionStorage' === storage) {
    return sessionStorage.getItem(tokenTableName);
  } else if ('cookie' === storage) {
    return cookie.get(tokenTableName);
  } else {
    return localStorage.getItem(tokenTableName);
  }
}

/**
 * @description: 存储accessToken
 * @param {type}
 * @return {viod}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-07-16 16:11:16
 */
export function setAccessToken(accessToken) {
  if (!storage) {
    return localStorage.setItem(tokenTableName, accessToken);
  }

  if ('localStorage' === storage) {
    return localStorage.setItem(tokenTableName, accessToken);
  } else if ('sessionStorage' === storage) {
    return sessionStorage.setItem(tokenTableName, accessToken);
  } else if ('cookie' === storage) {
    return cookie.set(tokenTableName, accessToken);
  } else {
    return localStorage.setItem(tokenTableName, accessToken);
  }
}

/**
 * @description: 移除accessToken
 * @param {type}
 * @return {viod}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-07-16 16:12:23
 */
export function removeAccessToken() {
  if (!storage) {
    return localStorage.removeItem(tokenTableName);
  }

  if ('localStorage' === storage) {
    return localStorage.removeItem(tokenTableName);
  } else if ('sessionStorage' === storage) {
    return sessionStorage.clear();
  } else if ('cookie' === storage) {
    return cookie.remove(tokenTableName);
  } else {
    return localStorage.removeItem(tokenTableName);
  }
}
