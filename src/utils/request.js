import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeOut } from './auth.js'
// 导入store
import store from '@/store/index.js'
// 封装token
const server = axios.create({
  // 后台代理
  timeout: 5000,
  baseURL: '/api'
})
// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (!isCheckTimeOut()) {
        // 过期执行退出
        store.dispatch('user/logout')
        // 不应该请求了
        return Promise.reject(new Error('token 过期'))
      }
      // 如果存在token   不存在 不封装
      config.headers.Authorization = `Beare ${store.getters.token}`
    }
    // 在发送前做什么
    return config
  },
  (error) => {
    // 请求错误做些什么
    return Promise.reject(error)
  }
)
// 错误处理  服务器返回错误 消息提醒
server.interceptors.response.use(
  (response) => {
    // 对相应数据做点什么
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message: message
      })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token失效code=401 单点登录 后台赶回特定的状态码 执行退出
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    // 对相应错误做点什么  服务器未知错误 才会进入这里
    ElMessage({
      type: 'error',
      message: error.message
    })
    // 对相应错误应该错什么
    return Promise.reject(error)
  }
)
// 封装好token
// 导出一个对象 封装好的token
export default server
