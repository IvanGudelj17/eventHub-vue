import { defineStore } from 'pinia'
import type { Event } from '../types/types.ts'
import axios from 'axios'
export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as Event[]
  }),
  getters: {
  getEventById: (state) => {
    return (id: number) => state.events.find(ev => ev.id === id)
  },
  },
  actions:{
    async createNewEvent(title:string, location:string, image:string, date:Date){
      const res = await axios.post('http://localhost:3000/events/createNewEvent',{title, location, image,date})
      console.log('new event is going to be added - ',title, location, image,date)
      const newEvent = res.data.user ?? res.data
      this.events.push(newEvent)
      return newEvent
    },
    async collectExistingEventsFromDataBase(){
  try {
    const res = await axios.get('http://localhost:3000/events/getAllEvents')
    this.events = res.data // zamijeni stanje s novim eventima
    return res.data
  } catch (err) {
    console.error('Cannot fetch events:', err)
    throw err
  }
  }}
})