<template>
  <div class="menu-container">
    <el-card class="tree-card">
      <template #header>
        <el-button type="primary" @click="handleCreateRootMenu"
          >新增顶级菜单</el-button
        >
      </template>
      <div class="menu-tree">
        <el-tree
          node-key="id"
          highlight-current
          default-expand-all
          :data="menus"
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
          draggable
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          @node-drop="handleDrop"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ node.label }} - {{ data.sort_id }}</span>
              <span>
                <el-button
                  link
                  type="primary"
                  @click.stop="handleCreateChildMenu(data)"
                >
                  添加
                </el-button>
                <el-button
                  link
                  type="warning"
                  @click="handleRemoveMenu(node, data)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </template>
        </el-tree>
      </div>
    </el-card>
    <el-card class="edit-card">
      <template #header>编辑菜单</template>
      <span v-if="editData == null">从菜单列表选择一项后，进行编辑</span>
      <editor-menu
        v-show="editData?.id"
        :data="editData!"
        @updateEdit="handleUpdateEdit"
      ></editor-menu>
    </el-card>
    <el-dialog :title="modalTitle" v-model="dialogVisible">
      <add-menu @submit="submitMenuForm"></add-menu>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { IMenuData } from '@/api/menu'
import { useReoladPage } from '@/hook/useReload'
import { useMenuStore, type ITreeItemData } from '@/stores/menu'
// import { usePermissionStore } from '@/stores/permission'
import type { AllowDropType, RenderContentContext } from 'element-plus'

defineOptions({
  name: 'System_menu'
})
// el-tree组件树形
const defaultProps = ref({
  label: 'title',
  children: 'children'
})

const menuStore = useMenuStore()

// const menus = computed(() => menuStore.state.menuTreeData)
const menus = computed(() => menuStore.state.authMenuTreeData)

onMounted(() => {
  menuStore.getAllMenuList()
  // menuStore.getAccessByRoles()
})

// 添加菜单类型 0顶级 1子级
const menuType = ref(0)

// modalTitle
const modalTitle = computed(() =>
  menuType.value === 0 ? '添加顶级菜单' : '添加子菜单'
)
const dialogVisible = ref(false)

const handleCreateRootMenu = () => {
  menuType.value = 0
  dialogVisible.value = true
}
// 缓存副菜单data
const parentData = ref<ITreeItemData | null>(null)
const handleCreateChildMenu = (data: ITreeItemData) => {
  menuType.value = 1
  dialogVisible.value = true
  parentData.value = data
}
// 重置表单状态
const resetStatus = () => {
  dialogVisible.value = false
  parentData.value = null
}
// 表单提交
const submitMenuForm = async (data: IMenuData) => {
  if (menuType.value === 0) {
    // 添加根菜单
    await handleAddRootMenu({ ...data })
  } else if (menuType.value === 1) {
    // 添加子菜单
    await handleAddChildMenu({ ...data })
  }
  resetStatus()
}

// 分配sordId 根据最后一个数据sortId+1
const getMenuNodeSortId = (list: ITreeItemData[]) => {
  if (list && list.length > 0) {
    return list[list.length - 1].sort_id + 1
  }
  return 0
}
// 顶级菜单分配parentId和sortId
const allocRootMenuId = (data: ITreeItemData) => {
  const sortId = getMenuNodeSortId(menus.value)
  data.sort_id = sortId
  data.parent_id = '0'
}
const { proxy } = getCurrentInstance()!
const { reloadPage } = useReoladPage()
const handleAddRootMenu = async (data: ITreeItemData) => {
  allocRootMenuId(data)
  const res = await menuStore.appendMenu(data)
  if (res) {
    proxy?.$message.success('菜单创建成功')
  }
  reloadPage()
}
// 子菜单分配sordId 和 parentId
const allocChildMenu = (data: ITreeItemData, parentData: ITreeItemData) => {
  const pid = parentData.id as number
  let sortId = 0
  if (!parentData.children) {
    parentData.children = []
  }
  if (parentData.children.length > 0) {
    sortId = getMenuNodeSortId(parentData.children as ITreeItemData[])
  }

  data.sort_id = sortId
  data.parent_id = pid
  return data
}
const handleAddChildMenu = async (data: ITreeItemData) => {
  const child = allocChildMenu(data, parentData.value!)
  const res = await menuStore.appendMenu(child as ITreeItemData)
  if (res) {
    proxy?.$message.success('菜单创建成功')
  }
  reloadPage()
}

const handleRemoveMenu = async (node: Node, menuData: ITreeItemData) => {
  try {
    proxy?.$confirm(`确定要删除菜单${menuData.title}吗`, '确认删除', {
      type: 'warning'
    })
    await menuStore.removeMenu(menuData)
    reloadPage()
  } catch {
    proxy?.$message({
      type: 'info',
      message: '已取消删除'
    })
  }
}

// 菜单编辑功能
// const editData = ref<IMenuData>({
//   id: -1,
//   title: '',
//   path: '',
//   name: '',
//   icon: '',
//   parent_id: '',
//   sort_id: 0
// })
const editData = ref<IMenuData>()
const handleNodeClick = (data: IMenuData) => {
  editData.value = { ...data }
}
const handleUpdateEdit = async (data: Partial<IMenuData>) => {
  const result = await menuStore.updateMenu(data)
  if (result) {
    proxy?.$message.success('菜单编辑成功')
    reloadPage()
  }
}

// 拖拽

type Node = RenderContentContext['node']
// 拖拽一级节点
// 判断节点能否被拖拽 如果返回 false ，节点不能被拖动
const allowDrag = (draggingNode: Node) => {
  const { data } = draggingNode
  return data.parent_id === 0 || data.parent_id === null
}
// 拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  const { data } = draggingNode
  if (data.parent_id !== 0 || data.parent_id !== null) {
    return type !== 'inner'
  }
}
// 更新
// const permissionStore = usePermissionStore()
const handleDrop = async () => {
  menus.value.forEach((menu, index) => {
    menu.sort_id = index
  })
  // 批量更新菜单状态，为了更新sord_id
  const menuList = menus.value.map((menu) => {
    const temp = { ...menu }
    delete temp.children
    return temp
  })

  const { code, message } = await menuStore.updateBulkMenu(menuList)
  if (code === 0) {
    proxy?.$message.success(message)
    // permissionStore.generateRoutes(1) // 1代表菜单排序更新
    reloadPage()
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  @apply flex p-20px;
  .tree-card {
    @apply min-w-500px;
  }
  .menu-tree {
    @apply h-400px overflow-y-scroll;
    .custom-tree-node {
      @apply flex-1 flex items-center justify-between text-sm pr-2;
    }
  }
  .edit-card {
    @apply flex-1 ml-15px;
  }
}
</style>
