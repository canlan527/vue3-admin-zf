import type { IUserLoginData } from '@/api/user'
import { login as loginApi } from '@/api/user'
import { removeToken, setToken } from '@/utils/auth'
import { useTagsView } from './tagsView'

export const useUserStore = defineStore('userStore', () => {
  const state = reactive({
    token: ''
  })

  const tagsViewStore = useTagsView()

  const login = async (userInfo: IUserLoginData) => {
    try {
      const { username, password } = userInfo
      const res = await loginApi({ username: username.trim(), password })
      const { data } = res
      state.token = data.token
      setToken(data.token)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const logout = () => {
    state.token = ''
    removeToken()
    // 清空所有已置状态
    tagsViewStore.delAllView()
  }

  return {
    state,
    login,
    logout
  }
})
