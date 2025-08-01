<template>
  <el-config-provider :size="store.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useGenerateTheme } from './hook/useGenerateTheme'
import { useAppstore } from './stores/app'

const store = useAppstore()
useGenerateTheme() // watch主题
</script>

<style scoped></style>
