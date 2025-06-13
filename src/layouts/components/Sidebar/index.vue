<template>
  <el-menu
    class="sidebar-container-menu"
    router
    :default-active="defaultActive"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
    :collapse="false"
  >
    <el-menu-item index="/dashboard">
      <el-icon><setting /></el-icon>
      <template #title>侧边导航1</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import variables from '@/assets/styles/variables.module.scss'

const route = useRoute()

const defaultActive = computed(() => {
  return route.path
})
</script>

<style scoped></style>
