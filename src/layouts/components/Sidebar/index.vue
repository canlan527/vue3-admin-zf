<template>
  <el-menu
    class="sidebar-container-menu"
    :default-active="defaultActive"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
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

const route = useRoute()
const store = useAppstore()

const defaultActive = computed(() => {
  return route.path
})
</script>

<style scoped></style>
