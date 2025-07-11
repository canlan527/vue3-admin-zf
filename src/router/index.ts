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
          title: 'Dashboard'
        }
      }
    ]
  }
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
        name: 'guide',
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
        name: 'menu',
        component: () => import('@/views/system/menu.vue'),
        meta: {
          icon: 'ant-design:appstore-filled',
          title: 'Menu Management'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role.vue'),
        meta: {
          icon: 'material-symbols:manage-accounts',
          title: 'Role Management',
          hidden: true
        }
      },
      {
        path: 'user',
        name: 'user',
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
