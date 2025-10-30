import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Table from '../pages/Table.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/table',
      name: 'table',
      component: Table,
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      // redirect: { name: 'home' }
      redirect: { name: 'table' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue'),
      meta: { requiresGuest: true }
    },
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Wait for auth state to be determined
  if (authStore.loading) {
    // Wait for auth state to be loaded by polling
    while (authStore.loading) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

export default router
