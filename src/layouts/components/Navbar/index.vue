<template>
  <div class="nav-bar" flex>
    <hamburger @toggleCollapse="toggleSidebar" :collapse="sidebar.opened" />
    <breadcrumb></breadcrumb>
    <div flex justify-end flex-1 items-center>
      <screenfull></screenfull>
    </div>
    <div flex items-center mx-3>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="选择组件大小"
        placement="left"
      >
        <size-select></size-select>
      </el-tooltip>
    </div>
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
