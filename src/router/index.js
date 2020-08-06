// /* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  authentication,
  loginInterception,
  routesWhiteList,
  progressBar,
  routerMode
} from '@/config/settings'
import store from '@/store'
import { constantRoutes } from './routes'
import { setDocumentTitle } from '@/utils/dom'

Vue.use(VueRouter)
NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
})

const router = new VueRouter({
  mode: routerMode,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes
})

//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/*const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}*/

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: routerMode,
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes
  }).matcher
}

router.beforeResolve(async (to, from, next) => {
  if (progressBar) NProgress.start()
  let hasToken = store.getters['user/accessToken']
  if (!loginInterception) hasToken = true
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const permissions = store.getters['user/permissions']
      const hasPermission = permissions && permissions.length > 0
      // console.log('router judge permissions: ', permissions, hasPermission)
      if (hasPermission) {
        next()
      } else {
        try {
          const permissions = await store.dispatch('user/getInfo')
          // console.log('router user/getInfo:', permissions, authentication)
          let accessRoutes = []
          if (authentication === 'intelligence') {
            accessRoutes = await store.dispatch('routes/setRoutes', permissions)
          } else {
            accessRoutes = await store.dispatch('routes/setAllRoutes')
          }
          // console.log('router accessRoutes', accessRoutes)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch {
          // console.log('false')
          await store.dispatch('user/resetAccessToken')
        }
      }
    }
  } else {
    if (routesWhiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  setDocumentTitle(to.meta.title)
  if (progressBar) NProgress.done()
})

router.afterEach(() => {
  if (progressBar) NProgress.done()
})

export default router
