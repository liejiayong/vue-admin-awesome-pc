import Layout from '@/layouts';
import EmptyLayout from '@/layouts/empty';

const Temp = {
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
      path: 'basecomp',
      component: EmptyLayout,
      redirect: 'noRedirect',
      name: 'basecomp',
      meta: {
        title: '基础组件',
        permissions: ['admin'],
      },
      alwaysShow: true,
      children: [
        {
          path: 'msgtool',
          component: () => import('@/views/temp/base/msgtool'),
          name: 'basecompMsg',
          meta: { title: '基础提示组件' },
        },
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
    {
      path: 'icon',
      component: EmptyLayout,
      redirect: 'noRedirect',
      name: 'Icon',
      meta: {
        title: '图标',
        permissions: ['admin'],
      },
      children: [
        {
          path: 'awesomeIcon',
          name: 'AwesomeIcon',
          component: () => import('@/views/temp/icon/index'),
          meta: { title: '常规图标' },
        },
        {
          path: 'remixIcon',
          name: 'RemixIcon',
          component: () => import('@/views/temp/icon/remixIcon'),
          meta: { title: '小清新图标' },
        },
        {
          path: 'colorfulIcon',
          name: 'ColorfulIcon',
          component: () => import('@/views/temp/icon/colorfulIcon'),
          meta: { title: '多彩图标' },
        },
      ],
    },
  ],
};

export default Temp;
