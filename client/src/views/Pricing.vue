<template>
  <div>
    <h2 class="section-title">选择你的学习计划</h2>
    <p class="section-subtitle">一次付费，全部课程永久解锁</p>

    <div class="pricing-grid">
      <!-- Monthly -->
      <div class="plan-card">
        <div class="plan-name">月付</div>
        <div class="plan-price">¥29.9</div>
        <div class="plan-period">/月</div>
        <ul class="plan-features">
          <li>全部视频课程</li>
          <li>配套讲义 PDF 下载</li>
          <li>课程答疑评论区</li>
          <li>随时取消</li>
        </ul>
        <button class="btn-buy secondary" @click="buy('price_1Td24AFz8g1hrumJcd2gTpAh')" :disabled="loading">
          {{ loading ? '跳转中...' : '立即订阅' }}
        </button>
      </div>

      <!-- Yearly -->
      <div class="plan-card featured">
        <div class="badge">推荐</div>
        <div class="plan-name">年付</div>
        <div class="plan-price">¥199</div>
        <div class="plan-period">/年 · 省 ¥160</div>
        <ul class="plan-features">
          <li>全部视频课程</li>
          <li>配套讲义 PDF 下载</li>
          <li>课程答疑评论区</li>
          <li><strong>赠送：</strong>1次1对1线上辅导</li>
        </ul>
        <button class="btn-buy primary" @click="buy('price_1Td26TFz8g1hrumJ45Vl1TUI')" :disabled="loading">
          {{ loading ? '跳转中...' : '立即订阅' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const loading = ref(false)

async function buy(priceId) {
  if (!auth.user) {
    alert('请先登录')
    return
  }

  loading.value = true
  try {
    const res = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        userId: auth.user.id,
        successUrl: window.location.origin + '/member',
        cancelUrl: window.location.origin + '/pricing',
      })
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else alert('支付创建失败，请重试')
  } catch (e) {
    alert('支付暂不可用: ' + e.message)
  } finally {
    loading.value = false
  }
}
</script>
