<template>
  <div class="editor-menu-container">
    <el-form
      ref="editFormRef"
      label-width="100px"
      :rules="menuFormRules"
      :model="editData"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input
          placeholder="请输入菜单名称"
          v-model="editData.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input
          placeholder="请输入路由路径"
          v-model="editData.path"
        ></el-input>
      </el-form-item>
      <el-form-item label="路由Name" prop="name">
        <el-input
          placeholder="请输入路由名称"
          v-model="editData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input
          placeholder="请输入icon图标"
          v-model="editData.icon"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMenuForm">编辑菜单</el-button>
        <el-button @click="submitReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { IMenuData } from '@/api/menu'
import type { FormInstance } from 'element-plus'
import type { PropType } from 'vue'

const editData = ref({
  id: -1,
  title: '',
  name: '',
  path: '',
  icon: ''
})

// 验证规则
const menuFormRules = {
  title: {
    required: true,
    message: '请输入菜单名称',
    trigger: 'blur'
  },
  path: {
    required: true,
    message: '请输入路由路径',
    trigger: 'blur'
  },
  name: {
    required: true,
    message: '请输入路由名称',
    trigger: 'blur'
  }
}

const editFormRef = ref<FormInstance | null>(null)
// const loading = ref(false)
// 触发编辑功能
const emits = defineEmits(['updateEdit'])

const resetFormData = (data: IMenuData) => {
  editData.value = { ...editData.value, ...data }
}

const props = defineProps({
  data: {
    type: Object as PropType<IMenuData>,
    required: true
  }
})

watch(
  () => props.data,
  (value) => {
    if (value) {
      resetFormData(value)
    }
  }
)

const submitReset = () => resetFormData(props.data)

const submitMenuForm = () => {
  ;(editFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      emits('updateEdit', editData.value)
    }
  })
}
</script>

<style scoped></style>
