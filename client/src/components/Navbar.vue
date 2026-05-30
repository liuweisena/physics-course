<template>
  <header class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">⚡ 高中物理 · 系统突破</router-link>
      <nav class="nav-links">
        <router-link to="/preview">免费试看</router-link>
        <router-link to="/pricing">定价</router-link>
        <template v-if="auth.user">
          <router-link to="/member">会员专区</router-link>
          <span class="user-tag">{{ auth.user.email }}</span>
          <button class="btn-logout" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-login">登录</router-link>
          <router-link to="/register" class="btn-register">注册</router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout()
  router.push('/')
}
</script>
