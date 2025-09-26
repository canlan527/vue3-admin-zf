<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
    >
      <div class="admin-logo">
        <img class="logo" src="../../assets/vue.svg" alt="logo" size-80px />
        <h1 class="name">Vue3 Admin</h1>
      </div>
      <el-form-item prop="username">
        <el-input
          placeholder="请输入用户名"
          v-model="loginState.loginForm.username"
        >
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="mdi:account"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
          show-password
          prop="password"
          v-model="loginState.loginForm.password"
        >
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="mdi:lock"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button type="primary" w-full mb-30px @click="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from '@/hook/useRouteQuery'
import { useUserStore } from '@/stores/user'
import { ElMessage, type FormInstance } from 'element-plus'

const { redirect, otherQuery } = useRouteQuery()
const { login } = useUserStore()
const router = useRouter()
const loginState = reactive({
  loginForm: {
    username: '',
    password: ''
  },
  rules: {
    username: [
      {
        required: true,
        trigger: 'blur',
        message: '请输入用户名'
      }
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: '请输入密码'
      }
    ]
  }
})

const { loginForm, rules } = loginState

const form = useTemplateRef<FormInstance>('loginForm')

const handleLogin = () => {
  form.value?.validate(async (valid) => {
    if (valid) {
      await login(loginForm)
      // 登录成功后，重定向到之前之前访问的路由
      router.push({
        path: redirect.value || '/',
        query: otherQuery.value
      })
      ElMessage.success({ message: '登录成功' })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  @apply min-h-screen w-full;
  .login-form {
    @apply w-500px mx-auto py200px;
  }
  .admin-logo {
    @apply flex justify-center items-center my-20px;
  }
}
</style>
