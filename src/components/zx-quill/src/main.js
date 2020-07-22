import Vue from "vue";
import App from "./App.vue";
import ZxQuill from "./components/export.js";
Vue.component("vab-quill", ZxQuill);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
