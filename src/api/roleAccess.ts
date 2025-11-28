import request from './config/request'
import type { IMenuData } from './menu'
import type { IRole } from './role'
import type { ApiResponse } from './type'
// 角色权限api
export interface IRoleAccess {
  id: number
  role_id: number
  access_id: number
}

export type IRoleAccessList = IRoleAccess[]
// 根据用户角色获取用户菜单
export type IRoleAccessWithMenuData = IMenuData & {
  roles: IRole[]
}
// 根据用户角色获取用户菜单的接口返回值
export interface IApiRoleAccess {
  access: IRoleAccessWithMenuData[]
}
// 获取角色对应权限
export const getRoleAccess = (
  id: number
): Promise<ApiResponse<IRoleAccessList>> => {
  return request.get(`/role_access/${id}`)
}

// 给角色分配权限
export const allocRoleAccess = (
  id: number,
  data: number[]
): Promise<ApiResponse> => {
  return request.post(`/role_access/${id}`, {
    access: data
  })
}

export const getAccessByRoles = (
  roles: number[]
): Promise<ApiResponse<IApiRoleAccess>> => {
  return request.post(`/role_access/role/access`, {
    roles
  })
}
