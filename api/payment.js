const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createSupabaseClient } = require('./_supabase')
const supabaseAdmin = createSupabaseClient(process.env.SUPABASE_SERVICE_KEY)

const router = express.Router()

// POST /api/payment/create-checkout
router.post('/create-checkout', async (req, res) => {
  const { priceId, userId, successUrl, cancelUrl } = req.body

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card', 'alipay'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
  })

  res.json({ url: session.url })
})

// POST /api/payment/webhook — raw body needed for signature verification
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.client_reference_id

    await supabaseAdmin.from('subscriptions').upsert({
      user_id: userId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      status: 'active',
      plan: session.metadata?.plan || 'monthly',
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object
    await supabaseAdmin
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('stripe_subscription_id', sub.id)
  }

  res.json({ received: true })
})

module.exports = router
