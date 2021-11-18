import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: index
  },
  {
    path: '/Index',
    name: 'Index',
    component: () => import('@/views/Layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
