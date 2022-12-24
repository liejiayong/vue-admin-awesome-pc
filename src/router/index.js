import * as VueRouter from "vue-router";
import { constantRoutes } from "./routes";

const isDev = ["dev", "development"].includes(import.meta.env.MODE);
const routes = [...constantRoutes];

const createRouter = () =>
  new VueRouter.createRouter({
    history: isDev ? VueRouter.createWebHashHistory() : VueRouter.createWebHistory(), // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
