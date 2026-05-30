import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

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
        const { data, error } = await supabase
          .from('courses')
          .select('*, videos(*)')
          .eq('is_published', true)
          .order('sort_order', { ascending: true })

        if (error) throw new Error(error.message)
        this.courses = data
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
})
