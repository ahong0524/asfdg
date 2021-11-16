import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/a',
    component: () => import('@/components/A1.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
