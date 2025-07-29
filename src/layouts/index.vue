<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar></navbar>
        <tags-view />
      </div>
      <!-- 核心渲染部分 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-wrapper {
  @apply flex w-full h-full;

  .sidebar-container {
    @apply bg-[var(--menu-bg)];
    /* 父组件修改子组件的样式 deep */
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }

  .main-container {
    @apply flex flex-col flex-1;

    .header {
      @apply h-[var(--header-height)];

      /* .navbar {
        @apply h-[var(--navbar-height)] bg-amber;
      } */
    }
  }
}
</style>
