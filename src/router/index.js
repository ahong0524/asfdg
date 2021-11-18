import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/index.vue'
const routes = [
  {
    // 登录页
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    // 主页
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
