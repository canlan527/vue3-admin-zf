<template>
  <div class="nav-bar">
    <hamburger @toggleCollapse="handleCollapse" :collapse="collapse" />
  </div>
</template>

<script setup lang="ts">
const collapse = ref(false)
const handleCollapse = () => {
  collapse.value = !collapse.value
}
</script>

<style scoped lang="scss">
.nav-bar {
  @apply h-[var(--navbar-height)];
}
</style>
