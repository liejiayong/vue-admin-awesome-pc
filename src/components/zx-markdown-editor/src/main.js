import Vue from "vue";
import App from "./App.vue";
import ZxMarkdownEditor from "./components/export.js";
Vue.component("byui-markdown-editor", ZxMarkdownEditor);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
