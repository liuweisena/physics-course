<template>
  <div>
    <h2 class="section-title">免费试看</h2>
    <p class="section-subtitle">先看，觉得有用再付费</p>

    <div v-if="store.loading" class="spinner">加载中...</div>

    <div v-else v-for="course in store.courses" :key="course.id">
      <div class="video-list">
        <div
          v-for="(video, idx) in (course.videos || []).slice(0, 3)"
          :key="video.id"
          class="video-item"
          @click="activeVideo = video"
        >
          <div class="num">{{ idx + 1 }}</div>
          <div class="info">
            <h4>{{ video.title }}</h4>
            <div class="dur">{{ video.duration }}</div>
          </div>
          <div class="lock" v-if="video.is_free">🆓</div>
          <div class="lock" v-else>🔒</div>
        </div>
      </div>
    </div>

    <!-- Active video -->
    <div v-if="activeVideo" style="margin-top: 32px;">
      <VideoPlayer
        :url="activeVideo.video_url"
        :title="activeVideo.title"
        :description="'免费试看片段'"
      />
      <div v-if="activeVideo.is_free" style="margin-top:16px; text-align:center;">
        <router-link to="/pricing" class="btn-primary" style="font-size:14px; padding:10px 24px;">
          解锁全部课程
        </router-link>
      </div>
    </div>

    <div v-if="!store.loading && !activeVideo" class="empty">
      <div class="icon">▶</div>
      <p>点击上方课程开始试看</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCoursesStore } from '../stores/courses'
import VideoPlayer from '../components/VideoPlayer.vue'

const store = useCoursesStore()
const activeVideo = ref(null)

onMounted(() => {
  store.fetchCourses()
})
</script>
