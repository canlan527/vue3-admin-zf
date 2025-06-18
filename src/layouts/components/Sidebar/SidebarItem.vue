<template>
  <template v-if="!item.meta?.hidden">
    <el-menu-item
      v-if="filteredChildren.length <= 1"
      :index="resolvePath(singleChildRoute.path)"
    >
      <el-icon v-if="iconName">
        <svg-icon :icon-name="iconName" />
      </el-icon>
      <template #title>
        {{ singleChildRoute.meta?.title }}
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon v-if="iconName">
          <svg-icon :icon-name="iconName" />
        </el-icon>
        <span>{{ singleChildRoute.meta?.title }}</span>
      </template>
      <SidebarItem
        v-for="child of filteredChildren"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </SidebarItem>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'

const { item, basePath } = defineProps<{
  item: RouteRecordRaw
  basePath: string
}>()

// 如果item.children只有一条数据，直接渲染此children
// 如果item.chlidren有多条，用el-submenu渲染
// 过滤出children
const filteredChildren = computed(() =>
  (item.children || []).filter((child) => !child.meta?.hidden)
)

// 要渲染的路由
const singleChildRoute = computed(() =>
  filteredChildren.value.length === 1
    ? filteredChildren.value[0]
    : { ...item, path: '' }
)

// 渲染的图标
const iconName = computed(() => singleChildRoute.value.meta?.icon)

// 解析和并且path路径
const resolvePath = (childPath: string) => path.resolve(basePath, childPath)
</script>

<style scoped></style>
