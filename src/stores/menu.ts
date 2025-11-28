import {
  addNewMenu,
  getAllMenus as getAllMenusApi,
  removeMenuById,
  updateMenuById,
  updateBulkMenu as updateBulkMenuApi,
  type IMenuData
} from '@/api/menu'
import { getAccessByRoles as getRoleAccessByRolesApi } from '@/api/roleAccess'
import { generateTree, type ITreeItemDataWithMeta } from '@/utils/generateTree'
// import { usePermissionStore } from './permission'

export interface ITreeItemData extends IMenuData {
  children?: Partial<ITreeItemDataWithMeta[]>
}

export interface IMenuState {
  menuList: Array<IMenuData> // 原始菜单列表数据
  menuTreeData: Array<ITreeItemData> // 树形菜单数据
  authMenuList: Array<IMenuData>
  authMenuTreeData: Array<ITreeItemDataWithMeta>
}

export const useMenuStore = defineStore('menu', () => {
  const state = reactive<IMenuState>({
    menuList: [], // 菜单列表
    menuTreeData: [], // 菜单树数据
    authMenuList: [], // 权限菜单列表
    authMenuTreeData: [] // 权限菜单树数据
  })

  // 获取所有菜单数据
  const getAllMenuList = async () => {
    const { code, data } = await getAllMenusApi()
    if (code === 0) {
      state.menuList = data
      state.menuTreeData = generateTree([...data]) // 生成树数据
    }
  }
  // 添加菜单
  const appendMenu = async (itemData: ITreeItemData) => {
    const res = await addNewMenu(itemData)
    const { id } = res.data as ITreeItemData
    if (res.code === 0) {
      const node = { ...itemData, id, children: [] }
      state.menuList.push(node)
      state.menuTreeData = generateTree([...state.menuList])
      return node
    }
  }
  // 删除菜单
  const removeMenu = async (itemData: ITreeItemData) => {
    const { code } = await removeMenuById(itemData.id)
    if (code === 0) {
      const idx = state.menuList.findIndex((menu) => menu.id === itemData.id)
      state.menuList.splice(idx, 1)
      state.menuTreeData = [...generateTree([...state.menuList])]
    }
  }

  // 编辑菜单
  const updateMenu = async (data: Partial<IMenuData>) => {
    const { code } = await updateMenuById(Number(data.id), data)
    if (code === 0) {
      await getAllMenuList()
      return true
    }
  }

  // 批量更新
  const updateBulkMenu = async (menuList: Array<IMenuData> = []) => {
    // 重置 sord_id
    state.menuTreeData.forEach((item, index) => {
      item.sort_id = index
    })
    // 删除children
    menuList = state.menuTreeData.map((item) => {
      const temp = { ...item }
      delete temp.children
      return temp
    })
    // 批量更新
    // const permissionStore = usePermissionStore()
    // permissionStore.generateRoutes(1)
    return await updateBulkMenuApi(menuList)
  }

  const getAllMenuListByAdmin = async () => {
    const { code, data } = await getAllMenusApi()
    if (code === 0) {
      state.authMenuList = data
      const treeData = generateTree([...data], true)
      state.authMenuTreeData = treeData as ITreeItemDataWithMeta[]
    }
  }

  const getAccessByRoles = async (roles: number[]) => {
    const { code, data } = await getRoleAccessByRolesApi(roles)
    if (code === 0) {
      const { access } = data
      state.authMenuList = [...access]
      const treeData = generateTree([...access], true)
      state.authMenuTreeData = treeData as ITreeItemDataWithMeta[]
      return treeData
    }
  }

  return {
    state,
    getAllMenuList,
    appendMenu,
    removeMenu,
    updateMenu,
    updateBulkMenu,
    getAllMenuListByAdmin,
    getAccessByRoles
  }
})
