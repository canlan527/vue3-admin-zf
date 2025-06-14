<template>
  <el-menu-item v-if="filteredChildren.length <= 1">
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
    ></SidebarItem>
  </el-sub-menu>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

const { item } = defineProps<{ item: RouteRecordRaw }>()

// 如果item.children只有一条数据，直接渲染此children
// 如果item.chlidren有多条，用el-submenu渲染
// 过滤出children
const filteredChildren = computed(() => item.children || [])

// 要渲染的路由
const singleChildRoute = computed(() =>
  filteredChildren.value.length === 1 ? filteredChildren.value[0] : item
)

// 渲染的图标
const iconName = computed(() => singleChildRoute.value.meta?.icon)
</script>

<style scoped></style>
