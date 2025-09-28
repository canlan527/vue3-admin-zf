import type { IProfile, IUserLoginData, IUserQuery, IUsers } from '@/api/user'
import {
  login as loginApi,
  getUsers as getUsersApi,
  addUser as addUserApi,
  updateUser as updateUserApi,
  removeUser as removeUserApi,
  getUserInfo as getUserInfoApi
} from '@/api/user'
import { removeToken, setToken } from '@/utils/auth'
import { useTagsView } from './tagsView'
import type { IRole } from '@/api/role'

export type IProfileQuery = IProfile & {
  pageNum?: number
  pageSize?: number
}

export const useUserStore = defineStore('userStore', () => {
  const state = reactive({
    token: '',
    users: [] as IUsers['users'], // 用户列表
    count: 0,
    userInfo: {} as IProfile,
    roles: [] as IRole[]
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

  // 获取用户信息
  const getUserInfo = async () => {
    const { code, data } = await getUserInfoApi()
    if (code === 0) {
      const { roles, ...info } = data
      state.roles = roles
      state.userInfo = info as IProfile
    }
  }

  // 获取用户列表
  const getUsers = async (params: IUserQuery) => {
    const { code, data } = await getUsersApi(params)
    if (code === 0) {
      const { users, count } = data
      state.users = users
      state.count = count
    }
  }

  // 添加用户
  const addUser = async (data: IProfileQuery) => {
    const { pageNum, pageSize, ...params } = data
    const { code } = await addUserApi(params)
    if (code === 0) {
      // 重新拉取用户列表
      getUsers({
        pageNum,
        pageSize
      })
    }
  }

  // 修改用户
  const updateUser = async (data: IProfileQuery) => {
    const { pageNum, pageSize, ...params } = data
    const { code } = await updateUserApi(params.id, params)
    if (code === 0) {
      getUsers({
        pageNum,
        pageSize
      })
    }
  }

  // 删除用户
  const removeUser = async (data: IProfileQuery) => {
    const { pageNum, pageSize, id } = data
    const { code } = await removeUserApi(id)
    if (code === 0) {
      getUsers({
        pageNum,
        pageSize
      })
    }
  }

  return {
    state,
    login,
    logout,
    getUserInfo,
    getUsers,
    addUser,
    updateUser,
    removeUser
  }
})
