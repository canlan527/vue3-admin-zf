<template>
  <div class="sidebar-logo-container" :class="{ collapse }">
    <transition name="logo-fade">
      <router-link to="/" :key="collapse ? 'a' : 'b'" class="sidebar-logo-link">
        <img class="sidebar-logo" :src="Logo" />
        <h1 v-if="!collapse" class="sidebar-logo-title">ZF admin</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/vue.svg'
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.sidebar-logo-link {
  @apply w-full h-60px leading-60px flex justify-center items-center;
  .sidebar-logo-title {
    @apply inline-block ml-8px text-20px text-white;
  }
}
.logo-fade-enter-from,
.logo-fade-leave-to {
  @apply opacity-0;
}
.logo-fade-enter-active {
  @apply transition-opacity duration-150 origin-bottom-left;
}
</style>
