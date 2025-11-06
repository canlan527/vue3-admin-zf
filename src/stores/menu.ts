import {
  addNewMenu,
  getAllMenus as getAllMenusApi,
  removeMenuById,
  updateMenuById,
  updateBulkMenu as updateBulkMenuApi,
  type IMenuData
} from '@/api/menu'
import { generateTree } from '@/utils/generateTree'

export interface ITreeItemData extends IMenuData {
  children?: ITreeItemData[]
}

export interface IMenuState {
  menuList: Array<IMenuData> // 原始菜单列表数据
  menuTreeData: Array<ITreeItemData> // 树形菜单数据
}

export const useMenuStore = defineStore('menu', () => {
  const state = reactive<IMenuState>({
    menuList: [],
    menuTreeData: []
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
  const updateBulkMenu = async () => {
    // 重置 sord_id
    state.menuTreeData.forEach((item, index) => {
      item.sort_id = index
    })
    // 删除children
    const menuList = state.menuTreeData.map((item) => {
      const temp = { ...item }
      delete temp.children
      return temp
    })
    // 批量更新
    await updateBulkMenuApi(menuList)
  }

  return {
    state,
    getAllMenuList,
    appendMenu,
    removeMenu,
    updateMenu,
    updateBulkMenu
  }
})
