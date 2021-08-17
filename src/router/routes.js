import Layout from '@/layouts';
import EmptyLayout from '@/layouts/empty';
import Temp from './modules/temp';

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/auth/login'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/auth/register'),
    hidden: true,
  },
  // {
  //     path: '/',
  //     component: Layout,
  //     redirect: 'index',
  //     children: [
  //         {
  //             path: 'index',
  //             name: 'Index',
  //             component: () => import('@/views/index/index'),
  //             meta: {
  //                 title: '首页',
  //                 icon: 'home',
  //                 affix: true
  //             }
  //         }
  //     ]
  // }
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/statcode/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/statcode/404'),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'userCenter',
        component: () => import('@/views/user/index'),
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
  {
    path: '/management',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '人员', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'user',
        name: 'PersonnelManagement_User',
        component: () => import('@/views/staff/user/index'),
        meta: { title: '用户管理' },
      },
      {
        path: 'role',
        name: 'PersonnelManagement_Role',
        component: () => import('@/views/staff/role/index'),
        meta: { title: '角色管理' },
      },
    ],
  },
  {
    path: '/customer',
    component: Layout,
    redirect: 'noRedirect',
    name: 'CustomerManagement',
    alwaysShow: true,
    meta: { title: '客服管理', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'user',
        name: 'CustomerManagement_User',
        component: () => import('@/views/customer/Table'),
        meta: { title: '用户管理' },
      },
    ],
  },
  {
    path: '/news',
    component: Layout,
    redirect: 'noRedirect',
    name: 'NewsManagement',
    alwaysShow: true,
    meta: { title: '新闻管理', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'notice',
        name: 'news_notices',
        component: () => import('@/views/news/notices'),
        meta: { title: '公告管理' },
      },
    ],
  },
  {
    path: '/error',
    component: EmptyLayout,
    redirect: 'noRedirect',
    name: 'Error',
    meta: { title: '错误页', icon: 'bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        component: () => import('@/views/statcode/401'),
        meta: { title: '401' },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/statcode/404'),
        meta: { title: '404' },
      },
    ],
  },
  Temp,
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

export default constantRoutes;
