import type {
  RouteLocationNormalizedLoadedGeneric,
  RouteRecordName
} from 'vue-router'

export const useTagsView = defineStore('tagsView', () => {
  // 存储已访问的视图列表
  const visitedViews = ref<RouteLocationNormalizedLoadedGeneric[]>([])
  // 存储需要缓存的视图列表
  const cachedViews = ref<RouteRecordName[]>([])
  // 添加视图到已访问视图列表和缓存列表中
  const addView = (view: RouteLocationNormalizedLoadedGeneric) => {
    const exits = visitedViews.value.some((v) => v.path === view.path)
    addCachedView(view) //重新添加缓存视图以防止缓存被清除
    if (exits) return
    const newView = {
      ...view,
      title: view.meta.title
    }
    visitedViews.value.push(newView)
  }
  // 从已访问视图列表和缓存视图列表中删除指定视图
  const deleteView = (view: RouteLocationNormalizedLoadedGeneric) => {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index > -1) {
      visitedViews.value.splice(index, 1)
    }
    deleteCachedView(view)
  }
  // 添加视图名称到缓存视图列表中，除非视图不需要缓存
  const addCachedView = (view: RouteLocationNormalizedLoadedGeneric) => {
    if (cachedViews.value.includes(view.name)) return
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name)
    }
  }
  // 从缓存视图列表中删除指定视图名称
  const deleteCachedView = (view: RouteLocationNormalizedLoadedGeneric) => {
    // const index = cachedViews.value.indexOf(view.name)
    // if (index > -1) {
    //   cachedViews.value.splice(index, 1)
    // }
    const viewName = view.name as string
    const index = cachedViews.value.indexOf(viewName)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }
  // 删除所有非固定视图，并清空缓存视图列表
  const delAllView = () => {
    visitedViews.value.filter((view) => view.meta.affix)
    cachedViews.value = []
  }
  // 删除指定视图外的所有视图，并保留指定视图的缓存
  const deleteOtherView = (view: RouteLocationNormalizedLoadedGeneric) => {
    visitedViews.value = visitedViews.value.filter(
      (v) => v.meta.affix || v.path === view.path
    )
    cachedViews.value = cachedViews.value.filter((name) => name === view.name)
  }

  return {
    visitedViews,
    addView,
    deleteView,
    cachedViews,
    deleteCachedView,
    delAllView,
    deleteOtherView
  }
})
