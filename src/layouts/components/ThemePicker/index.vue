<template>
  <div>
    <el-color-picker v-model="theme" :predefine="predefineColors" />
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/stores/settings'

const store = useSettingStore()

const theme = ref(store.setting.theme)
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
])

watch(theme, (newValue) => {
  store.changeSetting({ key: 'theme', value: newValue })
})
</script>

<style scoped></style>
