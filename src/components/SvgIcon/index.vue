<template>
  <Icon v-if="!isHL" :icon="iconName" :class="svgClass" v-bind="$attrs" />
  <div
    v-else-if="isHL && !multiColor"
    :style="styleHttpLKIcon"
    :class="customClass"
    v-bind="$attrs"
    bg-current
  ></div>
  <div v-if="multiColor" :class="customClass" v-bind="$attrs">
    <img :src="iconName" alt="iconName" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { isHttpLink } from '@/utils/validate'
const { iconName, customClass, multiColor } = withDefaults(
  defineProps<{
    iconName: string
    customClass?: string
    multiColor?: boolean
  }>(),
  {
    customClass: ''
  }
)
const isHL = computed(() => isHttpLink(iconName))

const svgClass = computed(() => (customClass ? `icon ${customClass}` : 'icon'))

const styleHttpLKIcon = computed(() => ({
  mask: `url(${iconName}) no-repeat 50% 50%`,
  '-webkt-mask': `url(${iconName}) no-repeat 50% 50%`,
  'mask-size': 'cover'
}))
</script>

<style scoped></style>
