import { Router } from 'express'
import { supabase } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import dotenv from 'dotenv'
dotenv.config()
const router = Router()

// novi event dodaj u tablciu favorites i onda taj event dohvati i vrati ga u piniu koja ce ga spremit
router.post('/createFavoriteItem', async( req, res)=>{
    console.log('Received new favorite event creation request:', req.body)
    const {event_id, user_id} = req.body as {event_id:Number, user_id: Number}
    try{
        const{error} = await supabase
            .from('favorites')
            .insert([{created_at: new Date().toISOString(), user_id,event_id}])
        if (error){return res.status(500).json({error: error.message})}
        const {data:event, error: eventError} = await supabase
            .from('events')
            .select('*')
            .eq('id',event_id)
            .single()
        if (eventError || !event) {
            console.error('Event fetch error:', eventError?.message)
            return res.status(404).json({ error: 'Event not found' })
    }
        return res.status(201).json(event)
    }catch(err){
        console.log('error accured in favorites server', err)
    }
})

router.post('/deleteEventFromFavorites', async (req,res)=>{
     console.log('Received new favorite event DELETE EVENT:', req.body)
     const {event_id, user_id} = req.body as {event_id:Number, user_id:Number}
     try{
        const{error}= await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user_id)
            .eq('event_id', event_id)
        if(error){return error}
        const{data: newList, error: eventError} = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id',user_id)
        if(eventError){
            console.error('New favorites events are not taken from DB succesfully', eventError?.message)
            return res.status(404).json({ error: 'favorites events are not taken from DB succesfully' })
        }
        return res.status(201).json(newList)
     }catch(err){ console.log('error accured in favorites server deleteEventFromFavorites', err)}
})

router.post('/fetchFavorites', async (req, res) => {
  const { user_id } = req.body
  try {
    const { data: newFavorites, error } = await supabase
      .from('favorites')
      .select('*, events(*)')
      .eq('user_id', user_id)

    if (error) {
      console.error('Failed to fetch favorites:', error.message)
      return res.status(400).json({ error: 'Could not fetch favorites' })
    }
    const eventsOnly = newFavorites.map((f) => f.events)// izvuci iz [{},{}] samo {} odnosno evente  
    console.log('Sending favorites ->', eventsOnly)
    return res.json(eventsOnly)
  } catch (err) {
    console.error('Server crash on fetchFavorites:', err)
    return res.status(500).json({ error: 'Server error' })
  }
})
export default router