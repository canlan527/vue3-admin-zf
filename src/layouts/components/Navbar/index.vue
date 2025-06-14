<template>
  <div class="nav-bar">
    <hamburger @toggleCollapse="toggleSidebar" :collapse="sidebar.opened" />
  </div>
</template>

<script setup lang="ts">
import { useAppstore } from '@/stores/app'
// 在解构的时候，要考虑值是不是对象，如果非对象的值解构出来会丧失响应式，可以使用storeToRef包装
const { sidebar, toggleSidebar } = useAppstore()
</script>

<style scoped lang="scss">
.nav-bar {
  @apply h-[var(--navbar-height)];
}
</style>
