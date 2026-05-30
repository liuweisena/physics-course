import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/preview', name: 'Preview', component: () => import('../views/Preview.vue') },
  { path: '/pricing', name: 'Pricing', component: () => import('../views/Pricing.vue') },
  { path: '/member', name: 'Member', component: () => import('../views/Member.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
