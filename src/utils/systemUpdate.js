import util from '@/utils/index';
import http from '@/utils/request';
import { Notification } from 'element-ui';
import Vue from 'vue';

const KEY_VERSION = 'jbf_wap_version';
const baseDir = location.pathname.includes('/wap') ? 'wap' : 'apptest';

const getConfig = () => {
  return new Promise((resolve) => {
    http
      .get(`/${baseDir}/config.json`, {
        params: {
          _t: new Date().getTime(),
        },
      })
      .then((res) => {
        resolve(res.version);
      });
  });
};

export async function isNewVersion() {
  // if (process.env.NODE_ENV === 'development') {
  //   return false;
  // }
  // const config = await getConfig();
  // let newVersion = config;
  let newVersion = 'config';
  let oldVersion = localStorage.getItem(KEY_VERSION);
  let isUpdated = oldVersion != newVersion;
  if (isUpdated) {
    Notification({
      title: '系统检测到有新版本，是否更新？',
      message: '<button class="mt-10 el-button el-button--primary el-button--small">更新</button>',
      dangerouslyUseHTMLString: true,
      duration: 0,
      position: 'bottom-right',
      showClose: false,
      onClick: () => {
        localStorage.setItem(KEY_VERSION, newVersion);
        window.location.reload(true);
      },
    });
  }
  return isUpdated;
}
