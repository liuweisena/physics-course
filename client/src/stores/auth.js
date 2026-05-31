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
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      this.hasActiveSubscription = !!sub
      this.subscription = sub
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
