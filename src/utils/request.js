import axios from 'axios'
import { ElMessage } from 'element-plus'
// 导入store
import store from '@/store/index.js'
// 封装token
const server = axios.create({
  // 后台代理
  timeout: 5000,
  baseURL: '/api'
})
// 不需要登陆(不需要token) 就能访问接口   白名单
// const whiteUrl = ['/sys/login']
// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
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
    // 对相应错误做点什么  服务器未知错误 才会进入这里
    ElMessage({
      type: 'error',
      message: 'xxx'
    })
    return Promise.reject(error)
  }
)
// 封装好token
// 导出一个对象 封装好的token
export default server
