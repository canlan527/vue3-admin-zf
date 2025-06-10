<template>
  <div>
    <el-button type="primary" @click="counterStore.increment">点击</el-button>
    {{ counterStore.count }}
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<style scoped></style>
