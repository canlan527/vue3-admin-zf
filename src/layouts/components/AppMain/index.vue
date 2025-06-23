<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  @apply bg-cyan overflow-hidden pos-relative;
  min-height: calc(100vh - var(--header-height));
  .fade-enter-active,
  .fade-leave-active {
    @apply transition-all delay-300 pos-absolute;
  }
  .fade-enter-from {
    @apply opacity-0 translate-x-[50px];
  }
  .fade-leave-to {
    @apply opacity-0 translate-x-[-50px];
  }
}
</style>
