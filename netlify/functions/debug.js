exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      stripeKeyPrefix: (process.env.STRIPE_SECRET_KEY || '').substring(0, 10),
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      nodeEnv: process.env.NODE_ENV,
    }),
  };
};
