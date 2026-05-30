// Node 18 compat: polyfill WebSocket before supabase loads
global.WebSocket = require('ws')

const { createClient } = require('@supabase/supabase-js')

function createSupabaseClient(serviceKey) {
  return createClient(
    process.env.SUPABASE_URL,
    serviceKey || process.env.SUPABASE_ANON_KEY,
    { auth: { persistSession: false } }
  )
}

module.exports = { createSupabaseClient }
