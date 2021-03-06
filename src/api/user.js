import Vue from 'vue';
import request from '@/utils/request';
import { encryptedData } from '@/utils/encrypt';
import settings from '@/config/settings';

export async function login(data) {
  if (settings.loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

export function getInfo(accessToken) {
  // return {
  //   url: '/userInfo',
  //   method: 'post',
  //   data: {
  //     accessToken,
  //     permissions: '1231',
  //     userName: 'L',
  //     avatar: `https://picsum.photos/50/50?random=${Date.now()}`
  //   }
  // }
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      accessToken,
    },
  });
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  });
}
export function register() {
  return request({
    url: '/register',
    method: 'post',
  });
}
