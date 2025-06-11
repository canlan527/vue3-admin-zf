import type { App } from 'vue'
// 导入服务型组件
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
// 加入到 vue 实例上
export default (app: App) => {
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}
