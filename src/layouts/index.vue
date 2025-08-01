<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @open-setting="showSetting"></navbar>
        <tags-view />
      </div>
      <!-- 核心渲染部分 -->
      <app-main></app-main>
    </div>
    <!-- 抽屉组件，根据 navbar的内容来切换 -->
    <right-panel v-model="setting" title="设置主题色">
      <settings />
    </right-panel>
  </div>
</template>

<script setup lang="ts">
const setting = ref(false)
const showSetting = () => {
  setting.value = true
}
</script>

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
