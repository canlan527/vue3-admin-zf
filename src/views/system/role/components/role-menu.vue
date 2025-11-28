<template>
  <div>
    <el-dialog v-model="dialogVisible">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        highlight-current
        default-expand-all
        show-checkbox
        node-key="id"
        ref="menuTreeRef"
        :check-strictly="checkStrictly"
      ></el-tree>
      <template #footer>
        <el-button type="primary" @click="handleCheckedAll">全部选择</el-button>
        <el-button type="warning" @click="handleSubmit">确认分配</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { IRole } from '@/api/role'
import { useMenuStore } from '@/stores/menu'
import type { PropType } from 'vue'
import type { RenderContentContext, TreeInstance } from 'element-plus'
import { allocRoleAccess, getRoleAccess } from '@/api/roleAccess'
import { useReoladPage } from '@/hook/useReload'

// 弹框逻辑
const { role, modelValue } = defineProps({
  role: {
    type: Object as PropType<IRole>,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const dialogVisible = ref(modelValue)
const emit = defineEmits(['update:modelValue'])

watch(
  () => dialogVisible.value,
  (value) => {
    emit('update:modelValue', value)
  }
)

// el-tree data
const menuStore = useMenuStore()
const treeData = computed(() => menuStore.state.menuTreeData)

onMounted(() => {
  menuStore.getAllMenuList()
})

const defaultProps = {
  label: 'title',
  children: 'children'
}

// 全选
type Node = RenderContentContext['node']
const menuTreeRef = ref<TreeInstance>()

const isCheckedAll = ref(false)
const handleCheckedAll = () => {
  if (!isCheckedAll.value) {
    menuTreeRef.value?.setCheckedNodes(
      treeData.value as unknown as Node[],
      false
    )
  } else {
    menuTreeRef.value?.setCheckedNodes([], false)
  }
  isCheckedAll.value = !isCheckedAll.value
}

// 加载角色的菜单权限
const checkStrictly = ref(false)
const getRoleAccessList = async () => {
  checkStrictly.value = true // 先解除父子绑定关系
  const { code, data } = await getRoleAccess(role.id)
  if (code === 0) {
    const accessList = data.map((item) => item.access_id)
    menuTreeRef.value?.setCheckedKeys(accessList)
  }
  checkStrictly.value = false // 恢复绑定关系
}

onMounted(() => {
  getRoleAccessList()
})
// 提交处理：菜单权限分配
const { proxy } = getCurrentInstance()!
const { reloadPage } = useReoladPage()
const handleSubmit = async () => {
  const tree = menuTreeRef.value!
  // 拿到tree的选中和半选状态的key
  const keys = tree.getCheckedKeys(false)
  const halfKeys = tree.getHalfCheckedKeys()
  const selectedKeys = [...keys, ...halfKeys]
  // 提交给接口
  const res = await allocRoleAccess(role.id, selectedKeys as number[])
  // 刷新处理
  if (res.code === 0) {
    proxy?.$message.success('权限分配成功')
    reloadPage()
  }
}
</script>

<style scoped></style>
