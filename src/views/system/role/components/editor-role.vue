<template>
  <el-form :model="editData" label-width="auto" style="max-width: 600px">
    <el-form-item label="角色名称">
      <el-input v-model="editData.name"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="editData.description"></el-input>
    </el-form-item>
    <el-form-item label="默认角色">
      <el-switch
        v-model="editData.is_default"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item class="btn" center>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { IRole } from '@/api/role'
import type { PropType } from 'vue'

const { data } = defineProps({
  data: {
    type: Object as PropType<IRole>,
    default: () => ({})
  },
  type: {
    type: Number,
    required: true
  }
})

const editData = ref({
  name: '',
  description: '',
  is_default: 0
})

const defaultData = {
  name: '',
  description: '',
  is_default: 0
}

const emit = defineEmits(['submit'])
const handleSubmit = () => {
  emit('submit', editData.value)
}

const resetForm = () => {
  editData.value = { ...defaultData, ...data }
}
const handleReset = () => {
  resetForm()
}
watchEffect(() => {
  if (data) {
    resetForm()
  }
})
</script>

<style lang="scss" scoped>
.btn {
  :deep(.el-form-item__content) {
    @apply flex justify-center gap-4;
  }
}
</style>
