<template>
  <div>
    <el-drawer
      :model-value="modelValue"
      :title="title"
      :direction="direction"
      @close="handleClose"
    >
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { DrawerProps } from 'element-plus'
import type { PropType } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String as PropType<DrawerProps['direction']>,
    default: 'rtl'
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const handleClose = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped></style>
