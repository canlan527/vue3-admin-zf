import type { IMenuData } from '@/api/menu'
import type { ITreeItemData } from '@/stores/menu'

export interface ITreeItemDataWithMeta extends ITreeItemData {
  meta?: {
    icon: string
    title: string
    [key: string]: string
  }
  children?: ITreeItemDataWithMeta[]
}

// export type ITreeItemDataWithMeta = ITreeItemData & {
//   meta?: { icon: string; title: string; [key: string]: string }
// }

type IMap = Record<number | string, ITreeItemDataWithMeta>

export const generateTree = (
  list: IMenuData[],
  withMeta: boolean = false
): ITreeItemData[] => {
  // 生成一个map结构，key为id，value为对象
  const map = list.reduce((prev, current) => {
    const temp = { ...current }

    // 加入meta元信息
    if (withMeta) {
      ;(temp as ITreeItemDataWithMeta).meta = {
        title: current.title,
        icon: current.icon
      }
    }
    prev[current.id as number] = temp
    return prev
  }, {} as IMap)

  const tree: ITreeItemData[] = []

  list.forEach((item) => {
    const temp = map[item.id as number]
    if (withMeta) {
      ;(temp as ITreeItemDataWithMeta).meta = {
        title: temp.title,
        icon: temp.icon
      }
    }
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
