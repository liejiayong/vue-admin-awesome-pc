/**
 * @copyright JyLie 809206619@qq.com
 * @description 判断当前路由是否包含权限
 * @param {Array} route 要处理的当前路由对象
 * @param {Array} permissions 用户权限
 * @returns {boolean|*}
 */
function hasPermission(route, permissions) {
  console.log('hasPermission', permissions, route);
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role));
  } else {
    return true;
  }
}

/**
 * @copyright JyLie 809206619@qq.com
 * @description intelligence模式根据permissions数组拦截路由
 * @param {Array} routes 要处理的所有路由对象
 * @param {Array} permissions 用户权限
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, permissions) {
  console.log('filterAsyncRoutes', routes, permissions);
  const finallyRoutes = [];
  routes.forEach((route) => {
    const item = { ...route };
    if (hasPermission(item, permissions)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions);
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}

/**
 * @copyright JyLie 809206619@qq.com
 * @description all模式渲染后端返回路由对象字符串routes,
 *              将routes处理为vue可以使用的路由对象
 * @param routes 要处理的所有路由对象字符串
 * @returns {*}
 */
export function filterAllRoutes(routes) {
  return routes.filter((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        console.log(1);
        route.component = (resolve) => require(['@/layouts'], resolve);
      } else if (route.component === 'EmptyLayout') {
        route.component = (resolve) => require(['@/layouts/empty'], resolve);
      } else {
        let path = 'views/' + route.component;
        if (new RegExp('^/views/.*$').test(route.component) || new RegExp('^views/.*$').test(route.component)) {
          path = route.component;
        } else if (new RegExp('^/.*$').test(route.component)) {
          path = 'views' + route.component;
        } else if (new RegExp('^@views/.*$').test(route.component)) {
          path = route.component.str.slice(2);
        } else {
          path = 'views/' + route.component;
        }
        route.component = (resolve) => require([`@/${path}`], resolve);
      }
    }

    if (route.children && route.children.length) {
      route.children = filterAllRoutes(route.children);
    }

    if (route.children && route.children.length === 0) {
      delete route.children;
    }

    return true;
  });
}
