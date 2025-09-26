import {
  getRoles as getRolesApi,
  addRole as addRoleApi,
  updateRole as updateRoleApi,
  removeRole as removeRoleApi,
  type IRole,
  type IRoleParams,
  type IRoleState
} from '@/api/role'

type WithRoleParams = IRole & IRoleParams

export const useRoleStore = defineStore('role', () => {
  const state = reactive<IRoleState>({
    roles: [],
    count: 0
  })

  const getRoles = async (params: IRoleParams) => {
    const { data } = await getRolesApi(params)
    state.roles = data.roles
    state.count = data.count
  }

  const addRole = async (data: WithRoleParams) => {
    const { pageNum, pageSize, ...obj } = data
    const { code } = await addRoleApi(obj)
    if (code === 0) {
      getRoles({ pageNum, pageSize })
    }
  }

  const updateRole = async (data: WithRoleParams) => {
    const { pageNum, pageSize, ...obj } = data
    const { code } = await updateRoleApi(data.id, obj)
    if (code === 0) {
      getRoles({ pageNum, pageSize })
    }
  }

  const removeRole = async (data: WithRoleParams) => {
    const { pageNum, pageSize, id } = data
    const { code } = await removeRoleApi(id)
    if (code === 0) {
      getRoles({ pageNum, pageSize })
    }
  }

  return {
    state,
    getRoles,
    addRole,
    updateRole,
    removeRole
  }
})
