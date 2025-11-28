<template>
  <template v-if="!item.meta?.hidden">
    <sidebar-item-link
      v-if="filteredChildren.length <= 1 && !item.meta?.alwaysShow"
      :to="singleChildRoute.path"
    >
      <el-menu-item :index="singleChildRoute.path">
        <el-icon v-if="iconName">
          <svg-icon :icon-name="iconName" />
        </el-icon>
        <template #title>
          {{ singleChildRoute.meta?.title }}
        </template>
      </el-menu-item>
    </sidebar-item-link>

    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon v-if="iconName">
          <svg-icon :icon-name="iconName" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <SidebarItem
        v-for="child of filteredChildren"
        :key="child.path"
        :item="child"
      >
      </SidebarItem>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { ITreeItemDataWithMeta } from '@/utils/generateTree'

const { item } = defineProps<{
  item: ITreeItemDataWithMeta
  basePath?: string
}>()

// 如果item.children只有一条数据，直接渲染此children
// 如果item.chlidren有多条，用el-submenu渲染
// 过滤出children
const filteredChildren = computed(() =>
  (item.children || []).filter((child) => !child.meta?.hidden)
)

// 要渲染的路由
const singleChildRoute = computed(() =>
  filteredChildren.value.length === 1 ? filteredChildren.value[0] : { ...item }
)
// 渲染的图标
const iconName = computed(() => singleChildRoute.value.meta?.icon)

// 解析和并且path路径
// const resolvePath = (childPath: string) => {
//   // 如果是外联直接返回路径，不做拼接操作
//   if (isHttpLink(childPath)) {
//     return childPath
//   }
//   // return path.resolve(basePath, childPath)
// }
</script>

<style scoped></style>
