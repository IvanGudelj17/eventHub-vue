import {defineStore} from 'pinia'
import type {Event} from '../types/types.ts'
import {useEventStore} from './events'
import axios from 'axios';

export const useFavoriteStore = defineStore('favorites',{

    state:()=>({
        favoriteEvents: [] as Event[],
        isLoaded: false
    }),
    actions:{
        async addToFavorites(event_id: Number, user_id : Number){
            console.log('new event is going to be added in favorites0 - ',event_id, user_id);
            const res = await axios.post('http://localhost:3000/favorites/createFavoriteItem',{event_id, user_id})
            console.log('new event is going to be added in favorites - ',event_id, user_id);
            const newEvent =  res.data // primi event kojeg vrati server
            if (!this.favoriteEvents.find(e => e.id === newEvent.id)) {this.favoriteEvents.push(newEvent)} //ako event vec nije u listi, dodaj ga
            return res
        },
        async removeFromFavorites(event_id: Number, user_id : Number){
            console.log(' event is going to be removed from favorites0 - ',event_id, user_id);
            const res = await axios.post('http://localhost:3000/favorites/deleteEventFromFavorites',{event_id, user_id})
            this.favoriteEvents = this.favoriteEvents.filter(e => e.id !== event_id)
            console.log(' event is going to be removed from favorites0 - ',event_id, user_id);
            const newEventsList =  res.data // primi event kojeg vrati server -> osvjezena lista eventa dodanih u favorite
            this.favoriteEvents = newEventsList //promjeni vrijednosti favorites liste nakon sto ih je korisnik updajeta
            return newEventsList
        },
        isInFavorites(event: Event | undefined):boolean{
            if(!event) return false;
            return this.favoriteEvents.some((ev:Event)=> ev.id === event.id)
        },
        getFavoritesList(){
            return this.favoriteEvents;
        },
        favoritesExists(){
            if(this.favoriteEvents.length > 0){
                return true
            }
            else{return false}
        },
        async fetchFavorites(user_id : Number){
            console.log('going to fetch fresh new favorites for this user ->', user_id)
            try{
            const res = await axios.post('http://localhost:3000/favorites/fetchFavorites',{user_id})
            const newFavoritesList =  res.data
            this.favoriteEvents = newFavoritesList
            return newFavoritesList
            }catch(err){}
        }
    }
});