<template>
  <div>
    dashboard
    <el-button type="primary" @click="handleButton">点击</el-button>
  </div>
</template>

<script setup lang="ts">
// 使用element-plus的服务型组件示例
const { proxy } = getCurrentInstance()!
const handleButton = () => {
  proxy?.$message('提交成功')
}
</script>

<style scoped></style>
