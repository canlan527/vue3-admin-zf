<template>
  <SidebarLogo v-if="showSidebarLogo" :collapse="store.sidebar.opened" />
  <el-menu
    class="sidebar-container-menu"
    :default-active="defaultActive"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="theme"
    :collapse="store.sidebar.opened"
    border-none
  >
    <SidebarItem
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
    ></SidebarItem>
  </el-menu>
</template>

<script setup lang="ts">
import variables from '@/assets/styles/variables.module.scss'
import { useAppstore } from '@/stores/app'
// import { routes } from '@/router'
import { useSettingStore } from '@/stores/settings'
import { useMenuStore } from '@/stores/menu'
// import type { RouteRecordRaw } from 'vue-router'

const route = useRoute()
const store = useAppstore()
const menuStore = useMenuStore()

const menuRoutes = computed(() => menuStore.state.authMenuTreeData)

const defaultActive = computed(() => {
  return route.path
})

const settingStore = useSettingStore()
const theme = computed(() => settingStore.setting.theme)
const showSidebarLogo = computed(() => settingStore.setting.showSidebarLogo)
</script>

<style scoped></style>
