<template>
  <div class="editor-container">
    <el-form
      ref="editFormRef"
      :model="editData"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="editData.username" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          placeholder="请输入手机号"
          maxlength="11"
          v-model="editData.mobile"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入邮箱" v-model="editData.email" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="editData.status"></el-switch>
      </el-form-item>
      <el-form-item label="角色分配" prop="roleIds">
        <el-select multiple placeholder="请选择角色" v-model="editData.roleIds">
          <el-option
            v-for="item in editData.roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入说明"
          v-model="editData.description"
        />
      </el-form-item>
      <el-form-item class="btn" center>
        <el-button type="primary" @click="submitMenuForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { IProfile } from '@/api/user'
import type { FormInstance, FormItemRule } from 'element-plus'
import type { PropType } from 'vue'

const { data } = defineProps({
  type: {
    type: Number,
    required: true
  },
  data: {
    type: Object as PropType<IProfile>,
    default: () => ({})
  }
})

const emit = defineEmits(['submit'])

const editFormRef = ref<FormInstance | null>(null)
const editData = ref<Partial<IProfile>>({
  username: '',
  mobile: '',
  email: '',
  status: true,
  description: ''
})
const validateMobile = (
  rule: unknown,
  value: string,
  callback: (arg?: Error) => void
) => {
  if (!isNaN(Number(value)) && value.length === 11) {
    callback()
  }
  callback(new Error('请输入正确的手机号！'))
}
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      message: '请输入11位手机号',
      trigger: 'blur',
      validator: validateMobile
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ] as FormItemRule[],
  roleIds: {
    required: true,
    message: '请至少选择一个角色',
    trigger: 'blur'
  }
}

const defaultProps = {
  username: '',
  email: '',
  mobile: '',
  description: '',
  status: true
}

watchEffect(() => {
  if (data) {
    editFormRef.value?.clearValidate()
    editData.value = { ...defaultProps, ...data }
  }
})

const submitMenuForm = () => {
  editFormRef.value?.validate((valid) => {
    if (valid) {
      emit('submit', editData.value)
    }
  })
}
</script>

<style lang="scss" scoped>
.btn {
  :deep(.el-form-item__content) {
    @apply flex justify-center gap-4;
  }
}
</style>
