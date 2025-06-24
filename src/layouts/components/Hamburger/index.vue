<template>
  <div class="hamburger-container">
    <svg-icon
      @click="handleClick"
      custom-class="hamburger"
      icon-name="ant-design:menu-fold-outlined"
      :class="{ 'rotate-180': collapse }"
    ></svg-icon>
  </div>
  <breadcrumb></breadcrumb>
</template>

<script setup lang="ts">
const { collapse } = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{ (e: 'toggleCollapse'): void }>()

const handleClick = () => {
  emit('toggleCollapse')
}
</script>

<style scoped lang="scss">
.hamburger-container {
  @apply leading-[50px] float-left cursor-pointer px-10px hover:(bg-black/5);
  .hamburger {
    @apply w-[30px] h-[30px];
  }
  :deep(.hamburger) {
    @apply transition-transform duration-300;
  }
}
</style>
