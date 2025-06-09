import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue'),
    },
  ],
})

export default router
