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
  createdAt?: string
}

export interface IUsers {
  users: IProfile[]
  count: number
}

export interface IUserQuery {
  pageNum?: number
  pageSize?: number
  mobile?: number
  status?: number
  username?: string
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

// 获取用户信息
export const getUserInfo = (): Promise<ApiResponse<IProfile>> => {
  return request.post('/auth/info')
}

// 获取用户列表
export const getUsers = (params: IUserQuery): Promise<ApiResponse<IUsers>> => {
  const {
    pageNum = 0,
    pageSize = 10,
    username = '',
    status,
    mobile = ''
  } = params
  return request.get('/user', {
    params: {
      pageNum,
      pageSize,
      status,
      username,
      mobile
    }
  })
}

// 添加用户
export const addUser = (data: IProfile): Promise<ApiResponse> => {
  return request.post('/auth/register', data)
}

// 修改用户
export const updateUser = (
  id: number,
  data: IProfile
): Promise<ApiResponse> => {
  return request.put(`/user/${id}`, data)
}

// 删除用户
export const removeUser = (id: number): Promise<ApiResponse> => {
  return request.delete(`/user/${id}`)
}
