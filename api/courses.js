const { createSupabaseClient } = require('./_supabase')
const supabase = createSupabaseClient()

// GET /api/courses — list all courses
module.exports = require('express')
  .Router()
  .get('/', async (req, res) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, videos(*)')
      .order('sort_order', { ascending: true })

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  })
  .get('/:id', async (req, res) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, videos(*)')
      .eq('id', req.params.id)
      .single()

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  })
