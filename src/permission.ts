/**
 * 鉴权：获取用户权限
 * 方法：
 * 需要用到router的钩子函数，每个页面加载之前都需要检查用户是否登录过
 */
import router from '@/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'
import { useUserStore } from './stores/user'
import nProgress from 'nprogress'
import { usePermissionStore } from './stores/permission'

NProgress.configure({ showSpinner: false })

// 配置白名单，将不需要校验的页面加入白名单
const whiteList = ['/login']

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  NProgress.start()
  // 开始检查：从localStorage或者pinia拿取token对比，
  // 如果有token还访问登录页的处理是->不跳转登录页
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      NProgress.done()
      return {
        path: '/',
        replace: true
      }
    } else {
      // 如果访问的不是登录页，则需要用token换取用户信息，根据用户信息的路由权限展示不同的菜单
      // 1. 如果有角色了，就不需要获取用户信息了
      // hasRoles
      try {
        const hasRoles =
          userStore.state.roles && userStore.state.roles.length > 0
        if (hasRoles) {
          // 有权限
          nProgress.done()
          return true
        }
        // 无用户信息和角色信息，就请求获取
        await userStore.getUserInfo()
        const roles = userStore.state.roles
        // 该用户为分配角色，进行异常提示
        if (!roles || roles.length === 0) {
          throw new Error('该用户为分配角色')
        }
        // 获取权限路由
        const accessedRoutes = await permissionStore.generateRoutes()
        // 动态注册路由
        accessedRoutes.forEach(router.addRoute)
        return router.push(to.path)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        userStore.logout()
        NProgress.done()
        return '/login?redirect=' + to.path
      }
    }
  } else {
    // 没有token，但是在白名单里也是可以放行
    if (whiteList.includes(to.path)) {
      NProgress.done()
      return true
    } else {
      // 当前页面如果没有token，或者token过期,或者也不在白名单里，不放行，跳转登录页进行登录
      NProgress.done()
      // const res = await testLogin()
      // console.log(res)
      return {
        path: '/login',
        // 给与跳转后的冲定向参数和其他参数
        query: {
          redirect: to.path,
          ...to.query
        }
      }
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})
