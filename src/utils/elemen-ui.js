import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default (app) => {
  // icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  // ui
  app.use(ElementPlus, {
    locale: zhCn,
  });
};
