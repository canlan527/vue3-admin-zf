/**
 * 鉴权：获取用户权限
 * 方法：
 * 需要用到router的钩子函数，每个页面加载之前都需要检查用户是否登录过
 */
import router from '@/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'

NProgress.configure({ showSpinner: false })

// 配置白名单，将不需要校验的页面加入白名单
const whiteList = ['/login']

router.beforeEach(async (to) => {
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
    }
    // 如果有token，访问的不是登录页就放行
    NProgress.done()
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
