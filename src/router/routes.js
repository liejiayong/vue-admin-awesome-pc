import Layout from '@/layouts'
// import EmptyLayout from '@/layouts/EmptyLayout'

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
    // {
    //     path: '/401',
    //     name: '401',
    //     component: () => import('@/views/401'),
    //     hidden: true,
    // },
    // {
    //     path: '/404',
    //     name: '404',
    //     component: () => import('@/views/404'),
    //     hidden: true,
    // },
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
    }
]

export default constantRoutes
