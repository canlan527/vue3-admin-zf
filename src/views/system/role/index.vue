<template>
  <div p-30px>
    <h1>角色管理</h1>
    <el-button @click="handleAddRole">添加角色</el-button>
    <el-table :data="roles" stripe style="width: 100%" py-10>
      <el-table-column prop="id" label="角色id" width="180" />
      <el-table-column prop="name" label="角色名称" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column
        prop="is_default"
        label="默认角色"
        :formatter="formatter"
      />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button link type="primary" @click="handleRoleMenu(scope.row)"
            >菜单权限</el-button
          >
          <el-button link type="warning" @click="handleEditRole(scope.row)"
            >修改</el-button
          >
          <el-button link type="danger" @click="handleRemove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[1, 5, 10, 20]"
      :background="true"
      :page-size="pageSize"
      layout="prev, pager, next, sizes, total"
      :total="count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 弹出对话框 -->
    <el-dialog :title="panelTitle" v-model="visibile" width="500" center>
      <editor-role :type="editType" :data="editData" @submit="handleSubmit" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { IRole } from '@/api/role'
import { useRoleStore } from '@/stores/role'
import { useRoleHelpers } from './roleHelpers'
defineOptions({
  name: 'System_role'
})

const store = useRoleStore()
const pageNum = ref(0)
const pageSize = ref(1)

const {
  panelTitle,
  handleEditRole,
  handleAddRole,
  handleSubmit,
  handleRemove,
  editType,
  editData,
  visibile
} = useRoleHelpers({ pageNum, pageSize })

const { roles, count } = toRefs(store.state)
watchEffect(() => {
  store.getRoles({ pageNum: pageNum.value, pageSize: pageSize.value })
})

const formatter = (row: IRole) => {
  return row.is_default ? '是' : '否'
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  pageNum.value = val - 1
}
</script>

<style scoped></style>
