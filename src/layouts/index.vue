<template>
  <div class="app-wrapper">
    <div class="sidebar-container">侧边导航</div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">导航条-1</div>
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
    @apply bg-red w-[var(--sidebar-width)];
  }
  .main-container {
    @apply flex flex-col flex-1;
    .header {
      @apply h-[var(--header-height)];
      .navbar {
        @apply h-[var(--navbar-height)] bg-amber;
      }
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
