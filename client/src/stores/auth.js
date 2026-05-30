import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    hasActiveSubscription: false,
    subscription: null,
    loading: true,
  }),
  actions: {
    async checkAuth() {
      this.loading = true
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        this.user = session.user
        await this.fetchSubscription()
      } else {
        this.user = null
        this.loading = false
      }
    },
    async fetchSubscription() {
      const token = (await supabase.auth.getSession()).data.session?.access_token
      if (!token) return
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        this.hasActiveSubscription = data.hasActiveSubscription
        this.subscription = data.subscription
      }
      this.loading = false
    },
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      this.user = data.user
      await this.fetchSubscription()
      return data
    },
    async register(email, password) {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      return data
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.hasActiveSubscription = false
      this.subscription = null
    }
  }
})
