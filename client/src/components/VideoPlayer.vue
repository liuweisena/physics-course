<template>
  <div class="video-player">
    <div class="video-wrapper">
      <!-- B站 -->
      <iframe
        v-if="isBilibili"
        :src="embedUrl"
        frameborder="0"
        allowfullscreen
        allow="autoplay; encrypted-media"
      />
      <!-- 自己的视频 -->
      <video
        v-else
        :src="url"
        controls
        controlslist="nodownload"
        playsinline
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

const isBilibili = computed(() => props.url.includes('bilibili.com'))

const embedUrl = computed(() => {
  if (!isBilibili.value) return props.url
  const bvid = props.url.match(/video\/(BV\w+)/)?.[1]
  const page = props.url.match(/[?&]p=(\d+)/)?.[1] || '1'
  if (!bvid) return props.url
  return `//player.bilibili.com/player.html?bvid=${bvid}&page=${page}&high_quality=1&danmaku=0&autoplay=0`
})
</script>
