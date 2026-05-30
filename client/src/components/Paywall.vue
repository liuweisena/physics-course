<template>
  <div class="paywall">
    <div class="paywall-overlay">
      <div class="paywall-content">
        <div class="lock-icon">🔒</div>
        <h3>这是付费内容</h3>
        <p>订阅后即可解锁完整课程，包含全部视频讲解和配套讲义</p>
        <router-link to="/pricing" class="btn-unlock">立即解锁 · 低至 ¥29.9/月</router-link>
        <p class="hint" v-if="auth.user">你已登录，购买后自动解锁</p>
        <router-link v-else to="/login" class="link-login">已有账号？先登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>
