const { createSupabaseClient } = require('./_supabase')
const supabaseAdmin = createSupabaseClient(process.env.SUPABASE_SERVICE_KEY)

// GET /api/auth/me — verify token and return user + subscription
module.exports = require('express')
  .Router()
  .get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: '未登录' })

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError) return res.status(401).json({ error: '登录已过期' })

    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    res.json({
      user: { id: user.id, email: user.email },
      hasActiveSubscription: !!sub,
      subscription: sub || null
    })
  })
