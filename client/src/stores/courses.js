import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCourses() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('/api/courses')
        if (!res.ok) throw new Error('加载课程失败')
        this.courses = await res.json()
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
})
