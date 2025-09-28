<template>
  <div class="user-container" p-30px>
    <h2>用户管理</h2>
    <el-button type="primary" @click="handleAddUser">新增用户</el-button>
    <el-form :inline="true" :model="formQuery" ref="queryFormRef" pt-20px>
      <el-form-item label="用户名" prop="username">
        <el-input
          placeholder="请输入用户名"
          v-model="formQuery.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          placeholder="请输入手机号"
          v-model="formQuery.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status" w-200px>
        <el-select placeholder="状态" v-model="formQuery.status">
          <el-option label="全部" value="all"></el-option>
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="正常" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="default" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="user-list">
      <el-table :data="users" pb-20px>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          :formatter="formatDate"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              @click="handleEditUser(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              @click="handleRemoveUser(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, sizes, jumper"
      />
    </div>
    <el-dialog v-model="visible" :title="modalTitle">
      <editor-user
        :type="editType"
        :data="editData"
        @submit="handleSubmit"
      ></editor-user>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { IProfile, IUserQuery } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { userHelpers } from './userHelpers'
import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'System_user'
})

const userStore = useUserStore()

const pageNum = ref(0)
const pageSize = ref(10)
const {
  visible,
  modalTitle,
  queryFormRef,
  editType,
  editData,
  handleAddUser,
  handleEditUser,
  handleRemoveUser,
  handleSubmit
} = userHelpers({ pageNum, pageSize })

// 查询参数
const formQuery = reactive({
  username: '',
  status: 'all',
  mobile: ''
})

const { getUsers } = userStore
const users = computed(() => userStore.state.users)
const total = computed(() => userStore.state.count)

const getUserList = () => {
  getUsers({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    ...formQuery
  } as unknown as IUserQuery)
}

// 格式化status
const formatter = (row: IProfile) => {
  return row.status ? '正常' : '禁用'
}

const formatDate = (row: IProfile) => {
  return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
}

onMounted(() => {
  getUserList()
})
// 分页器功能部分
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getUserList()
}

const handleCurrentChange = (val: number) => {
  pageNum.value = val - 1
  getUserList()
}

// 搜索查询与重置
const handleSearch = () => {
  getUserList()
}

const handleReset = () => {
  ;(queryFormRef.value as FormInstance).resetFields()
  getUserList()
}
</script>

<style scoped></style>
