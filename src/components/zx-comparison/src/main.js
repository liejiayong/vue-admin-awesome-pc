import Vue from 'vue';
import App from './App.vue';
import ZxComparison from './components/export.js';
Vue.component('byui-comparison', ZxComparison);
Vue.config.productionTip = false;
new Vue({
    render: h => h(App)
}).$mount('#app');
