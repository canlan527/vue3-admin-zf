import type { IProfile } from '@/api/user'
import { useRoleStore } from '@/stores/role'
import { useUserStore, type IProfileQuery } from '@/stores/user'
import type { FormInstance } from 'element-plus'

export const userHelpers = ({
  pageNum,
  pageSize
}: {
  pageNum: Ref<number>
  pageSize: Ref<number>
}) => {
  const editData = ref<IProfile | undefined>(undefined)
  const visible = ref(false)
  const editType = ref(-1) // 1新增 0编辑
  const modalTitle = computed(() =>
    editType.value === 1 ? '新增用户' : '编辑用户'
  )
  const queryFormRef = useTemplateRef<FormInstance | null>('queryFormRef')

  const userStore = useUserStore()
  const { addUser, updateUser, removeUser } = userStore

  const roleStore = useRoleStore()
  roleStore.getRoles({ pageNum: pageNum.value, pageSize: pageSize.value })
  const roles = computed(() => roleStore.state.roles)
  const { proxy } = getCurrentInstance()!

  const handleAddUser = () => {
    editType.value = 1
    visible.value = true
    editData.value = {} as IProfile
    editData.value.roles = roles.value
    editData.value.roleIds = []
  }

  const addNewUser = (data: IProfile) => {
    addUser({
      ...data,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    queryFormRef.value?.resetFields()
    proxy?.$message.success('新增用户成功')
    visible.value = false
  }

  const handleEditUser = (index: number, row: IProfile) => {
    editType.value = 0
    visible.value = true
    // 回填信息
    editData.value = { ...row }
    // 获取当前编辑用户的现有角色列表
    editData.value.roles = row.roles
    editData.value.roleIds = row.roles.map((item) => item.id)
  }

  const editUser = (data: IProfileQuery) => {
    updateUser({
      ...data,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    queryFormRef.value?.resetFields()
    proxy?.$message.success('修改用户成功')
    visible.value = false
  }

  const handleRemoveUser = async (index: number, row: IProfile) => {
    try {
      await proxy?.$confirm(
        `你确认要删除用户 ${row.username} 吗？`,
        '删除确认',
        { type: 'warning' }
      )
      await removeUser({
        id: row.id,
        pageNum: pageNum.value,
        pageSize: pageSize.value
      } as IProfileQuery)
    } catch {
      proxy?.$message({
        type: 'info',
        message: '操作已取消'
      })
    }
  }

  const handleSubmit = (data: IProfile) => {
    if (editType.value === 1) {
      addNewUser(data)
    } else {
      editUser(data)
    }
  }

  return {
    visible,
    modalTitle,
    queryFormRef,
    editType,
    editData,
    handleAddUser,
    handleEditUser,
    handleRemoveUser,
    handleSubmit
  }
}
