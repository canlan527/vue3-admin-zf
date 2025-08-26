<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive :include="includes">
        <component :is="Component" :key="$route.path"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useTagsView } from '@/stores/tagsView'

const store = useTagsView()
const includes = computed(() => store.cachedViews as string[])
</script>

<style lang="scss" scoped>
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
</style>
