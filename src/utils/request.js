import { ElMessage } from 'element-plus'
import axios from 'axios'
import store from '@/store/index.js'

// 封装token  --> api 只有登录以后才能访问  在axios 封装header{token}
const server = axios.create({
  // 后台代理 + cros
  timeout: 5000,
  baseURL: '/api'
})

// 不需要登录(不需要token) 就能访问的接口  白名单
// const whiteUrl = ['/sys/login']
// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 如果存在token
      config.headers.Authorization = `Bearer ${store.getters.token} `
    }

    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 错误处理 服务器返回错误  消息提醒
server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么 对的数据 错的数据
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
    // 服务器没有返回数据或者是服务器未知错误
    ElMessage({
      type: 'error',
      message: 'xxx'
    })
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 封装好的token

// 导出一个对象

export default server
