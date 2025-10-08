import { Router } from 'express'
import { supabase } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import dotenv from 'dotenv'


dotenv.config()
const router = Router()

//Create New event ad save him into database
router.post('/createNewEvent', async (req,res) =>{
    console.log('Received new event request:', req.body)
    const {title, location, image,date} = req.body as {title:string, location:string, image:string, date:Date}
    try{
        const {data, error} = await supabase
        .from('events')
        .insert([{ created_at: new Date().toISOString(), title, location,image, date }])
        .select('title,location,image,date')
        .single()
    if(error) return res.status(500).json({error: error.message})
    return res.status(201).json({user: data})
    }catch(err){
        return res.status(500).json({error: 'internal server error'})
    }

}),
//collect all existing events from db
router.get('/getAllEvents', async (req, res) => {
  console.log('Received request to get all events0')
  try {
    console.log('Received request to get all events')
    const { data: events, error } = await supabase
      .from('events')
      .select('id, title, location, image, date')

    if (error) {
      console.log('Supabase error:', error.message)
      return res.status(500).json({ error: error.message })
    }

    console.log('Events fetched from Supabase:', events)
    return res.json(events)

  } catch (err) {
    console.log('Internal server error:', err)
    return res.status(500).json({ error: 'Cannot fetch events' })
  }
})

export default router


//server backend events