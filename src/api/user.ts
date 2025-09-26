import request from './config/request'
import type { IRole } from './role'
import type { ApiResponse } from './type'

export interface IUserLoginData {
  username: string
  password: string
}

export interface ILoginResponseData {
  token: string
}

export interface IProfile {
  id: number
  username: string
  email: string
  mobile: string
  isSuper: boolean
  status: boolean
  avatar: string
  description: string
  roles: IRole[]
  roleIds?: number[] // 修改用户的时候，后端接收只要id
}

// 请求登录接口
export const login = (
  data: IUserLoginData
): Promise<ApiResponse<ILoginResponseData>> => {
  return request.post('/auth/login', data)
}

// 测试401
export const testLogin = () => {
  return request.get('/auth/test')
}
