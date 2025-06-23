<template>
  <div>
    <p>使用icon</p>
    <svg-icon
      icon-name="mage:rocket-fill"
      custom-class="text-blue-100"
      @click="handle"
    ></svg-icon>
    <svg-icon
      icon-name="mage:robot-wink"
      custom-class="text-blue-100"
      @click="handle"
    ></svg-icon>
    <svg-icon
      icon-name="lineicons:vuejs"
      custom-class="text-green-300 w-2em h-2em"
      @click="handle"
    ></svg-icon>
    <svg-icon
      icon-name="lineicons:react"
      custom-class="text-red-300 w-2em h-2em"
      @click="handle"
    ></svg-icon>
    <svg-icon
      icon-name="https://webpack.js.org/icon-square-small.9e8aff7a67a5dd20.svg"
      custom-class="h-2em w-2em"
      :multi-color="true"
      @click="handle"
    ></svg-icon>
    <svg-icon
      icon-name="https://zishui.oss-cn-beijing.aliyuncs.com/BugFilled.svg"
      custom-class="text-blue-100 h-2em w-2em bg-red"
      @click="handle"
    ></svg-icon>
    <input type="text" />
  </div>
</template>

<script setup lang="ts">
const handle = () => {
  console.log('svg-icon')
}
</script>

<style scoped></style>
