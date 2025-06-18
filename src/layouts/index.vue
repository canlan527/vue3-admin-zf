<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar></navbar>
        <div class="tags-view">导航条-2</div>
      </div>
      <div class="app-main">
        <router-view />
      </div>
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

      .tags-view {
        @apply h-[var(--tagsview-height)] bg-blue;
      }
    }

    .app-main {
      @apply bg-cyan h-[calc(100vh-var(--header-height))];
    }
  }
}
</style>
