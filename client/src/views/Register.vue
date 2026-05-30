<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>注册</h2>
      <div v-if="error" class="error-msg">{{ error }}</div>
      <div v-if="success" style="background:#f0fdf4;color:#166534;padding:10px 14px;border-radius:8px;margin-bottom:16px;font-size:14px;">
        注册成功！请查收邮箱确认邮件。
        <router-link to="/login" style="display:block;margin-top:8px;">去登录</router-link>
      </div>
      <form v-else @submit.prevent="handleRegister">
        <div class="form-group">
          <label>邮箱</label>
          <input v-model="email" type="email" placeholder="your@email.com" required />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="password" type="password" placeholder="至少 6 位" required minlength="6" />
        </div>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>
      <div class="auth-switch">
        已有账号？<router-link to="/login">去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    await auth.register(email.value, password.value)
    success.value = true
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
