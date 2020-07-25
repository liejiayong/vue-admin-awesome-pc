import Layout from '@/layouts'
import EmptyLayout from '@/layouts/empty'

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
]

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
                    affix: true
                }
            }
        ]
    },
    {
        path: "/error",
        component: EmptyLayout,
        redirect: "noRedirect",
        name: "Error",
        meta: { title: "错误页", icon: "bug" },
        children: [
            {
                path: "401",
                name: "Error401",
                component: () => import('@/views/statcode/401'),
                meta: { title: "401" },
            },
            {
                path: "404",
                name: "Error404",
                component: () => import('@/views/statcode/404'),
                meta: { title: "404" },
            },
        ],
    },
    {
        path: "*",
        redirect: "/404",
        hidden: true,
    }
]

export default constantRoutes
