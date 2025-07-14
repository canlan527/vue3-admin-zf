<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <svg-icon
          custom-class="w-2em h-2em"
          icon-name="mdi:format-size"
        ></svg-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :command="item.value"
            v-for="item in sizeOptions"
            :key="item.label"
            :disabled="item.value === store.size"
          >
            {{ item.value }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import type { Size } from '@/plugins/element'
import { useAppstore } from '@/stores/app'

const store = useAppstore()

const sizeOptions = ref([
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Large',
    value: 'large'
  },
  {
    label: 'Small',
    value: 'small'
  }
])

const handleCommand = (value: Size) => {
  store.setSize(value)
}
</script>

<style scoped></style>
