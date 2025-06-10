<template>
  <div>
    <h2 @click="counterStore.increment">点击</h2>
    {{ counterStore.count }}
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<style scoped></style>
