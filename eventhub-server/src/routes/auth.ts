import { Router } from 'express'
import { supabase } from '../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { requireAuth } from '../middleware/requireAuth'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string }

  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' })
  if (!password || password.length < 3) return res.status(400).json({ error: 'Password too short' })

  try {
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existing) return res.status(409).json({ message: 'User already exists' })

    const hashed = await bcrypt.hash(password, 12)

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashed, created_at: new Date().toISOString() }])
      .select('id,email')
      .single()

    if (error) return res.status(500).json({ error: error.message })

    return res.status(201).json({ user: data })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string }

  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' })
  if (!password || password.length < 3) return res.status(400).json({ error: 'Password too short' })

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id,email,password')
      .eq('email', email)
      .maybeSingle()

    if (error) return res.status(500).json({ error: error.message })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    })

    return res.json({ token })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// ME
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'No token provided' })

    const token = authHeader.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', decoded.email)
      .single()

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
