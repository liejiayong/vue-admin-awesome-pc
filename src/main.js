import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import initPlugin from "@/utils/plugins.js";

import "virtual:svg-icons-register";
import "@/styles/index.scss";

const app = createApp(App);

app.use(router).use(createPinia());

initPlugin(app);

app.mount("#app");
