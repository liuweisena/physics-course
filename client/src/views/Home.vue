<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <h1>跟我学<span class="highlight">高中物理</span><br>用编程思维拆解每一道题</h1>
      <p>大厂程序员转行物理教学，把理科思维带到每道题里。覆盖力学、电磁学、热学全部模块。</p>
      <router-link to="/preview" class="btn-primary">免费试看</router-link>
    </section>

    <!-- Courses -->
    <section>
      <h2 class="section-title">全部课程</h2>
      <p class="section-subtitle">从高一到高三，系统突破每一个知识点</p>

      <div v-if="store.loading" class="spinner">加载中...</div>
      <div v-else-if="store.error" class="spinner">{{ store.error }}</div>
      <div v-else class="course-grid">
        <div class="course-card" v-for="c in store.courses" :key="c.id">
          <h3>{{ c.title }}</h3>
          <div class="meta">{{ c.video_count || c.videos?.length || 0 }} 节课</div>
          <div class="desc">{{ c.description }}</div>
          <span class="tag" v-for="t in (c.tags || [])" :key="t">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <div class="testimonial">
      <strong>12 万</strong> 学员正在学习 · <strong>4.9 分</strong> 好评率
    </div>

    <!-- CTA -->
    <section style="text-align:center; padding: 40px 0 20px;">
      <router-link to="/pricing" class="btn-primary">立即订阅 · 低至 ¥29.9/月</router-link>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCoursesStore } from '../stores/courses'

const store = useCoursesStore()

onMounted(() => {
  store.fetchCourses()
})
</script>
