import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          icon: 'ant-design:dashboard-filled',
          title: 'Dashboard',
          affix: true, // 固定在标签栏tagsView上
          noCache: true // 不要缓存
        }
      }
    ]
  },
  {
    //当跳转到/redirect/a/b/c/d?query=1
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index.vue'),
    meta: { hidden: true }
  }
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   meta: {
  //     hidden: true
  //   },
  //   // 当跳转到/redirect/a/b/c/d?query=1
  //   children: [
  //     {
  //       // path: '/redirect/:path(.*)',
  //       path: ':path(.*)',
  //       component: () => import('@/views/redirect/index.vue')
  //     }
  //   ]
  // }
]

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/xxx',
    component: Layout,
    meta: {
      hidden: true
    }
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import('@/views/documentation/index.vue'),
        meta: {
          icon: 'ant-design:container-filled',
          title: 'Documentation'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index/:id',
        name: 'Test',
        component: () => import('@/views/test/index.vue'),
        meta: {
          icon: 'ant-design:container-filled',
          title: 'Test'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import('@/views/guide/index.vue'),
        meta: {
          icon: 'ant-design:box-plot-filled',
          title: 'Guide'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    meta: {
      icon: 'material-symbols:settings-account-box',
      title: 'System',
      alwaysShow: true // 作为父文件夹一直显示
      // breadcrumb: false
    },
    children: [
      {
        path: 'menu',
        name: 'System_menu',
        component: () => import('@/views/system/menu.vue'),
        meta: {
          icon: 'ant-design:appstore-filled',
          title: 'Menu Management'
        }
      },
      {
        path: 'role',
        name: 'System_role',
        component: () => import('@/views/system/role.vue'),
        meta: {
          icon: 'material-symbols:manage-accounts',
          title: 'Role Management',
          hidden: true
        }
      },
      {
        path: 'user',
        name: 'System_user',
        component: () => import('@/views/system/user.vue'),
        meta: {
          icon: 'material-symbols:account-circle',
          title: 'User Management',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://chatgpt.com/',
        redirect: '/',
        meta: {
          title: 'link gpt',
          icon: 'mdi:link-variant'
        }
      }
    ]
  }
]

export const routes: RouteRecordRaw[] = [...constantRoutes, ...asyncRoutes]

export default createRouter({
  routes,
  history: createWebHistory()
})
