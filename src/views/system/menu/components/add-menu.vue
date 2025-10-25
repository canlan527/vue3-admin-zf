<template>
  <div class="menu-form">
    <el-form ref="menuFormRef" :model="menuFormData" :rules="rules">
      <el-form-item label="菜单名称" prop="title">
        <el-input
          v-model="menuFormData.title"
          placeholder="请输入菜单名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="路由路径" prop="path">
        <el-input
          v-model="menuFormData.path"
          placeholder="请输入路由路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="路由名称" prop="name">
        <el-input
          v-model="menuFormData.name"
          placeholder="请输入路由名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input
          v-model="menuFormData.icon"
          placeholder="请输入icon名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMenuForm">创建菜单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

// 定义属性
const menuFormData = reactive({
  title: '',
  path: '',
  name: '',
  icon: '',
  parent_id: '',
  sort_id: 0
})
const menuFormRef = ref<FormInstance | null>(null)

// 验证规则
const rules = reactive({
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
  },
  icon: {
    required: true,
    message: '请输入图标',
    trigger: 'blur'
  }
})

const emits = defineEmits(['submit'])

// 提交menuFormData
const submitMenuForm = () => {
  menuFormRef.value?.validate((valid) => {
    if (valid) {
      emits('submit', menuFormData)
      menuFormRef.value?.resetFields()
    }
  })
}
</script>

<style scoped></style>
