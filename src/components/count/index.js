import jCount from './count.vue';
export default {
  install(Vue) {
    Vue.component('Jcount', jCount);
  },
};
export { jCount };
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('jcount', jCount);
}
