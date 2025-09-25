import { defineStore } from 'pinia'
import type { Event } from '../types/types.ts'
export const useEventStore = defineStore('events', {
  state: () => ({
    events: [
      {
        id: 1,
        title: 'Vue.js Conference',
        date: '2025-10-15',
        location: 'Zagreb',
        image: 'https://source.unsplash.com/random/400x200?conference'
      },
      {
        id: 2,
        title: 'Node.js Meetup',
        date: '2025-11-05',
        location: 'Split',
        image: 'https://source.unsplash.com/random/400x200?programming'
      },
      {
        id: 3,
        title: 'AI in Tech',
        date: '2025-12-01',
        location: 'Osijek',
        image: 'https://source.unsplash.com/random/400x200?ai'
      }
    ] as Event[]
  }),
  getters: {
    getEventById: (state) => {
        return (id: number) => state.events.find((ev: Event) => ev.id === id)
    }
  }
})
