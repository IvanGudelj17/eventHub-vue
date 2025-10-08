import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import eventsRoutes from './routes/events'
import dotenv from 'dotenv'
import favoritesRoutes from './routes/favorites'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/events', eventsRoutes)
app.use('/auth', authRoutes)
app.use('/favorites', favoritesRoutes)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
