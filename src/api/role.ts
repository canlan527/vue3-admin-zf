import request from './config/request'
import type { ApiResponse } from './type'

export interface IRole {
  id: number
  name: string
  description: string
  is_default: number
}

export interface IRoleState {
  roles: IRole[]
  count: number
}

export interface IRoleParams {
  pageNum: number
  pageSize: number
}

// 获取角色
export const getRoles = (
  params = { pageNum: 0, pageSize: 10 }
): Promise<ApiResponse<IRoleState>> => {
  return request.get('/role', {
    params
  })
}

// 添加角色
export const addRole = (data: IRole): Promise<ApiResponse> => {
  return request.post('/role', data)
}

// 修改角色
export const updateRole = (
  id: number,
  data: Partial<IRole>
): Promise<ApiResponse> => {
  return request.put(`/role/${id}`, data)
}

// 删除角色
export const removeRole = (id: number): Promise<ApiResponse> => {
  return request.delete(`/role/${id}`)
}
