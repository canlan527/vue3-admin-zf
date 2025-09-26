import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/auth'
import axios, { type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const config = {
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 3000
}

const service = axios.create(config)

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = response.data

    if (code !== 0) {
      ElMessage.error(message)
      return Promise.reject(message)
    }
    return response.data
  },
  (err) => {
    const store = useUserStore()
    const { status } = err.response
    if (status === 401) {
      // 说明 token 不正确
      store.logout()
      window.location.reload()
    }

    return Promise.reject(err)
  }
)

export default service
