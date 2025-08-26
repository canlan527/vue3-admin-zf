<template>
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
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    ></SidebarItem>
  </el-menu>
</template>

<script setup lang="ts">
import variables from '@/assets/styles/variables.module.scss'
import { useAppstore } from '@/stores/app'
import { routes } from '@/router'
import { useSettingStore } from '@/stores/settings'

const route = useRoute()
const store = useAppstore()

const defaultActive = computed(() => {
  return route.path
})

const settingStore = useSettingStore()
const theme = computed(() => settingStore.setting.theme)
</script>

<style scoped></style>
