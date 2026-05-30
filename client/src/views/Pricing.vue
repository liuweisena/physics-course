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
        <button class="btn-buy secondary" @click="handleBuy">
          立即订阅
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
        <button class="btn-buy primary" @click="handleBuy">
          立即订阅
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

function handleBuy() {
  if (!auth.user) {
    alert('请先登录')
    return
  }
  alert('支付功能接入中，请先联系老师微信购买')
}
</script>
