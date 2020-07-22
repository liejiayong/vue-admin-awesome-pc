
/**
 * @copyright JyLie 809206619@qq.com
 * @description tagsBar多标签页逻辑，前期借鉴了很多开源项目发现都有个共同的特点很繁琐并不符合框架设计的初衷，后来在github用户cyea的启发下完成了重构，请勿修改
 */
import { asyncRoutes, constantRoutes } from '@/router/routes'
import { getRouterList } from '@/api/router'
import { filterAllRoutes, filterAsyncRoutes } from '@/utils/router'

const state = { routes: [], partialRoutes: [] }
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  }
}
const actions = {
  async setRoutes({ commit }, permissions) {
    let accessedRoutes = []
    if (permissions.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = await filterAsyncRoutes(asyncRoutes, permissions)
    }
    commit('setRoutes', accessedRoutes)
    return accessedRoutes
  },
  async setAllRoutes({ commit }) {
    let { data } = await getRouterList()
    data.push({ path: '*', redirect: '/404', hidden: true })
    let accessRoutes = filterAllRoutes(data)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  }
}

export default { state, getters, mutations, actions }
