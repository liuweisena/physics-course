<template>
  <div>
    <div v-if="auth.loading" class="spinner">验证身份中...</div>

    <div v-else-if="!auth.user">
      <div class="empty">
        <div class="icon">🔒</div>
        <p>请先登录后访问会员专区</p>
        <router-link to="/login" class="btn-primary" style="margin-top:16px;">去登录</router-link>
      </div>
    </div>

    <div v-else-if="!auth.hasActiveSubscription">
      <div class="empty">
        <div class="icon">💳</div>
        <p>你还没有订阅，无法查看完整内容</p>
        <router-link to="/pricing" class="btn-primary" style="margin-top:16px;">去订阅</router-link>
      </div>
    </div>

    <div v-else>
      <h2 class="section-title">已解锁 · 全部课程</h2>
      <p class="section-subtitle">订阅到期：{{ auth.subscription?.current_period_end?.split('T')[0] || '-' }}</p>

      <div v-if="store.loading" class="spinner">加载中...</div>
      <div v-else v-for="course in store.courses" :key="course.id">
        <h3 style="margin-top:40px; margin-bottom:16px;">✅ {{ course.title }}</h3>
        <div class="video-list">
          <div
            v-for="(video, idx) in (course.videos || [])"
            :key="video.id"
            class="video-item"
            @click="activeVideo = video"
          >
            <div class="num">{{ idx + 1 }}</div>
            <div class="info">
              <h4>{{ video.title }}</h4>
              <div class="dur">{{ video.duration }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeVideo" style="margin-top: 32px;">
        <VideoPlayer
          :url="activeVideo.video_url"
          :title="activeVideo.title"
          :description="activeVideo.description"
        />
      </div>

      <div v-if="!activeVideo" class="empty">
        <div class="icon">👆</div>
        <p>点击上方课程开始学习</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCoursesStore } from '../stores/courses'
import VideoPlayer from '../components/VideoPlayer.vue'

const auth = useAuthStore()
const store = useCoursesStore()
const activeVideo = ref(null)

onMounted(async () => {
  await auth.checkAuth()
  if (auth.hasActiveSubscription) {
    store.fetchCourses()
  }
})
</script>
