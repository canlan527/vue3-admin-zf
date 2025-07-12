<template>
  <Icon v-if="!isHL" :icon="iconName" :class="svgClass" v-bind="$attrs" />
  <div
    v-else-if="isHL && !props.multiColor"
    :style="styleHttpLKIcon"
    :class="customClass"
    v-bind="$attrs"
    bg-current
  ></div>
  <div v-if="props.multiColor" :class="customClass" v-bind="$attrs">
    <img :src="iconName" alt="iconName" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { isHttpLink } from '@/utils/validate'
const props = defineProps<{
  iconName: string
  customClass?: string
  multiColor?: boolean
}>()

const isHL = computed(() => isHttpLink(props.iconName))

const svgClass = computed(() =>
  props.customClass ? `icon ${props.customClass}` : 'icon'
)

const styleHttpLKIcon = computed(() => ({
  mask: `url(${props.iconName}) no-repeat 50% 50%`,
  '-webkt-mask': `url(${props.iconName}) no-repeat 50% 50%`,
  'mask-size': 'cover'
}))
</script>

<style scoped></style>
