// 兼容IE
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins';

/**
 * @author JyLie 809206619@qq.com
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('@/utils/mock');
  mockXHR();
}

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app-awesome');

console.log(vm);

console.log('VUE_APP_TITLE', process.env.VUE_APP_TITLE);
console.log('VUE_APP_AUTHOR', process.env.VUE_APP_AUTHOR);
console.log('VUE_APP_PUBLIC_PATH', process.env.VUE_APP_PUBLIC_PATH);
console.log('VUE_APP_OUTPUT_DIR', process.env.VUE_APP_OUTPUT_DIR);
console.log('VUE_APP_HTTP_BASE_URL', process.env.VUE_APP_HTTP_BASE_URL);
