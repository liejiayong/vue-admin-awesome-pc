import Layout from '@/layouts';
import EmptyLayout from '@/layouts/empty';

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
    path: '/temp',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Temp',
    alwaysShow: true,
    meta: { title: '组件模板', remixIcon: 'user' },
    children: [
      {
        path: 'excel',
        component: EmptyLayout,
        redirect: 'noRedirect',
        name: 'Excel',
        meta: {
          title: 'Excel',
          permissions: ['admin'],
        },
        alwaysShow: true,
        children: [
          {
            path: 'export',
            component: () => import('@/views/temp/excel/exportExcel'),
            name: 'ExportExcel',
            meta: { title: '导出Excel' },
          },
          // {
          //     path: "exportSelectedExcel",
          //     component: () => import("@/views/vab/excel/exportSelectExcel"),
          //     name: "ExportSelectedExcel",
          //     meta: { title: "导出选中行" },
          // },
          // {
          //     path: "exportMergeHeaderExcel",
          //     component: () => import("@/views/vab/excel/exportMergeHeaderExcel"),
          //     name: "ExportMergeHeaderExcel",
          //     meta: { title: "导出合并" },
          // },
          // {
          //     path: "uploadExcel",
          //     component: () => import("@/views/vab/excel/uploadExcel"),
          //     name: "UploadExcel",
          //     meta: { title: "上传Excel" },
          // },
        ],
      },
      {
        path: 'sprite',
        component: EmptyLayout,
        redirect: 'noRedirect',
        name: 'Sprite',
        meta: {
          title: 'Sprite',
          permissions: ['admin'],
        },
        alwaysShow: true,
        children: [
          {
            path: 'Images',
            component: () => import('@/views/temp/sprite/images'),
            name: 'SpriteImages',
            meta: { title: 'Images' },
          },
        ],
      },
      {
        path: 'charts',
        component: EmptyLayout,
        redirect: 'noRedirect',
        name: 'ChartsLayout',
        meta: { title: '图表' },
        alwaysShow: true,
        children: [
          {
            path: 'echarts',
            component: () => import('@/views/temp/charts/echarts'),
            name: 'Charts_echart',
            meta: { title: 'echarts' },
          },
        ],
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
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

export default constantRoutes;
