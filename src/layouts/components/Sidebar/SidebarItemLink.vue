<template>
  <div>
    <component :is="componentType" v-bind="componentProps">
      <slot></slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import { isHttpLink } from '@/utils/validate'

const { to } = defineProps<{
  to: string
}>()

const isExt = computed(() => isHttpLink(to))

// 判断渲染的元素
const componentType = computed(() => (isExt.value ? 'a' : 'router-link'))

const componentProps = computed(() => {
  if (isExt.value) {
    // 如果是外链，将属性批量绑定到componet元素上
    return {
      href: to,
      target: '_blank'
    }
  } else {
    // 如果不是外链
    return {
      to
    }
  }
})
</script>
