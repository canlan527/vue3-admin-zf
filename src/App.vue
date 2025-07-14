<template>
  <el-config-provider :size="store.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppstore } from './stores/app'

const store = useAppstore()
</script>

<style scoped></style>
