import type { IMenuData } from '@/api/menu'
import type { ITreeItemData } from '@/stores/menu'

type IMap = Record<number | string, ITreeItemData>

export const generateTree = (list: IMenuData[]) => {
  // 生成一个map结构，key为id，value为对象
  const map = list.reduce((prev, current) => {
    const temp = { ...current }
    prev[current.id as number] = temp
    return prev
  }, {} as IMap)

  const tree: ITreeItemData[] = []

  list.forEach((item) => {
    const temp = map[item.id as number]
    const pid = temp.parent_id
    if ((pid != null || pid !== 0) && map[pid]) {
      const parent = map[pid]
      if (!parent.children) parent.children = []
      parent.children.push(temp)
      return
    }
    tree.push(temp)
  })

  return tree
}
