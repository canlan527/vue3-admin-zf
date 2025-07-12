<template>
  <div>
    <svg-icon
      @click="handleClick"
      custom-class="w-2em h-2em cursor-pointer"
      :icon-name="isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'

const isFullscreen = ref(false)
const { proxy } = getCurrentInstance()!

const handleClick = () => {
  if (screenfull.isEnabled) {
    // 看是否全屏，全屏就切换状态
    screenfull.toggle()
  } else {
    proxy!.$message('浏览器不支持全屏')
  }
}
const undateFullscreenStatus = () => {
  // 将 screenfull 的全屏状态赋值给组件变量isFullscreen
  isFullscreen.value = screenfull.isFullscreen
}
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', undateFullscreenStatus)
  }
})

onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', undateFullscreenStatus)
  }
})
</script>

<style scoped></style>
