<template>
  <div class="video-player">
    <div class="video-wrapper">
      <iframe
        :src="embedUrl"
        frameborder="0"
        allowfullscreen
        allow="autoplay; encrypted-media"
      />
    </div>
    <div class="video-info">
      <h3>{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' }
})

const embedUrl = computed(() => {
  // B站: https://www.bilibili.com/video/BVxxx?p=1 → //player.bilibili.com/player.html?bvid=BVxxx&page=1
  if (props.url.includes('bilibili.com/video/')) {
    const bvid = props.url.match(/video\/(BV\w+)/)?.[1]
    const page = props.url.match(/[?&]p=(\d+)/)?.[1] || '1'
    if (bvid) return `//player.bilibili.com/player.html?bvid=${bvid}&page=${page}&high_quality=1`
  }
  // 抖音 or direct URL, return as-is
  return props.url
})
</script>
