import type { IMenuData } from '@/api/menu'
import type { RouteRecordRaw } from 'vue-router'
import { useMenuStore } from './menu'
import { useUserStore } from './user'
import { asyncRoutes } from '@/router'
import path from 'path-browserify'

export interface IPermissionState {
  routes: Array<RouteRecordRaw>
  accessRoutes: Array<RouteRecordRaw>
}

const generateRoutesPaths = (menus: Array<IMenuData>): string[] => {
  return menus.map((menu) => menu.path)
}

const whiteList = ['/:pathMatch(.*)*']

const generateRoutes = (
  routes: RouteRecordRaw[],
  routePaths: string[],
  bathPath = '/'
) => {
  const routerData: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const routePath = path.resolve(bathPath, route.path)
    if (route.children) {
      // 查看子路由是否有匹配上的路由
      route.children = generateRoutes(route.children, routePaths, routePath)
    }
    // 如果当前子路由数量大于0 有匹配上或paths中包含当前路由path，就需要把父路由添加上
    if (
      routePaths.includes(routePath) ||
      (route.children && route.children.length >= 1) ||
      whiteList.includes(routePath)
    ) {
      routerData.push(route)
    }
  })
  return routerData
}

const filterAsyncRoutes = (menus: IMenuData[], routes: RouteRecordRaw[]) => {
  const routePaths = generateRoutesPaths(menus)
  return generateRoutes(routes, routePaths)
}

export const usePermissionStore = defineStore('permission', () => {
  const state = reactive<IPermissionState>({
    routes: [],
    accessRoutes: []
  })
  const menuStore = useMenuStore()
  const userStore = useUserStore()

  const generateRoutes = async (type?: number) => {
    // 菜单排序更新
    let accessedRoutes: Array<RouteRecordRaw> = []

    const roleNames = computed(() =>
      userStore.state.roles.map((item) => item.name)
    )
    const roleIds = computed(() => userStore.state.roles.map((item) => item.id))

    if (roleNames.value.includes('super_admin')) {
      // 超级管理员
      accessedRoutes = [...asyncRoutes]
      await menuStore.getAllMenuListByAdmin()
      return accessedRoutes
    } else {
      // 根据角色过滤菜单
      const menus = await menuStore.getAccessByRoles(roleIds.value)
      if (type !== 1) {
        accessedRoutes = filterAsyncRoutes(menus as IMenuData[], asyncRoutes)
      }
      return accessedRoutes
    }
  }

  return {
    state,
    generateRoutes
  }
})
