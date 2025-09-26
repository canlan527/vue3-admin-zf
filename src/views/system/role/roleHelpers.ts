import type { IRole } from '@/api/role'
import { useRoleStore } from '@/stores/role'

export const useRoleHelpers = ({
  pageNum,
  pageSize
}: {
  pageNum: Ref<number>
  pageSize: Ref<number>
}) => {
  const { proxy } = getCurrentInstance()!
  const editType = ref(-1)
  const visibile = ref(false)
  const editData = ref<IRole | undefined>(undefined)
  const store = useRoleStore()

  const panelTitle = computed(() =>
    editType.value === 1 ? '新增角色' : '修改角色'
  )

  const handleEditRole = (role: IRole) => {
    editType.value = 0
    editData.value = { ...role }
    visibile.value = true
  }

  const handleAddRole = () => {
    editType.value = 1
    editData.value = {} as IRole
    visibile.value = true
  }

  const addNewRole = async (data: IRole) => {
    await store.addRole({
      ...data,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    proxy?.$message.success('添加角色成功')
    visibile.value = false
  }

  const editRole = async (data: IRole) => {
    await store.updateRole({
      ...data,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    proxy?.$message.success('修改角色成功')
    visibile.value = false
  }

  const handleSubmit = async (data: IRole) => {
    if (editType.value === 1) {
      //添加
      await addNewRole(data)
    } else {
      // 修改
      await editRole(data)
    }
  }

  const handleRemove = async (data: IRole) => {
    try {
      await proxy?.$confirm(`你确定要删除角色${data.name}吗`, {
        type: 'warning'
      })
      await store.removeRole({
        ...data,
        pageNum: pageNum.value,
        pageSize: pageSize.value
      })
      proxy?.$message.success('已删除角色')
    } catch {
      proxy?.$message.info('已取消操作')
    }
  }

  return {
    panelTitle,
    handleEditRole,
    handleAddRole,
    handleSubmit,
    handleRemove,
    editType,
    editData,
    visibile
  }
}
