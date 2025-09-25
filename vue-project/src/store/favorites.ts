import {defineStore} from 'pinia'
import type {Event} from '../types/types.ts'
import {useEventStore} from './events'

export const useFavoriteStore = defineStore('favorites',{

    state:()=>({
        favoriteEvents: [] as Event[]
    }),
    actions:{
        addToFavorites(event: Event | undefined){
            if(!event) return;
            if(this.favoriteEvents.some((ev :Event)=> ev.id === event.id)) return;
            this.favoriteEvents.push(event);
        },
        removeFromFavorites(event: Event | undefined){
            if(!event) return;
            this.favoriteEvents = this.favoriteEvents.filter((ev:Event)=> ev.id !== event.id);
        },
        isInFavorites(event: Event | undefined):boolean{
            if(!event) return false;
            return this.favoriteEvents.some((ev:Event)=> ev.id === event.id)
        },
        getFavoritesList(){
            return this.favoriteEvents;
        }
    }
});