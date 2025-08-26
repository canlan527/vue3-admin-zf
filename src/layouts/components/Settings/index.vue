<template>
  <div class="drawer-item">
    <span>主题色</span>
    <theme-picker></theme-picker>
  </div>
  <div class="drawer-item">
    <span>是否展示标签栏</span>
    <el-switch v-model="tagsView"></el-switch>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/stores/settings'

const store = useSettingStore()

const showTagsView = computed(() => store.setting.showTagsView)

const tagsView = computed({
  get() {
    return showTagsView.value
  },
  set(val: boolean) {
    store.changeSetting({ key: 'showTagsView', value: val })
  }
})
</script>

<style scoped></style>
