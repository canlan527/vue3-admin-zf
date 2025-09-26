<template>
  <div>
    <el-dropdown trigger="click">
      <div overflow-hidden rounded-full mx-2>
        <img :src="avatar" h-30px w-30px flex items-center />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <router-link to="/profile/index">
            <el-dropdown-item>个人设置</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click="logout">
            <span block>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import avatar from '@/assets/avatar.png'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
// const router = useRouter()
const { proxy } = getCurrentInstance()!

const logout = () => {
  store.logout()
  proxy?.$message.success('退出成功')
  // window.location.reload()
}
</script>

<style scoped></style>
