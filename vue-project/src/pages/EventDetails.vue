<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useEventStore} from '../store/events'
import { onMounted, ref } from 'vue'
import { useFavoriteStore } from '@/store/favorites'
const router = useRouter()
const eventStore = useEventStore()
const eventId = Number(router.currentRoute.value.params.id)
const showEvent= eventStore.getEventById(eventId)
const isFetched = ref(false)

onMounted(()=>
{
  if(showEvent){
    isFetched.value=true
  }
})

const favoriteStore = useFavoriteStore()
</script>

<template>
  <h1>Details about event {{ showEvent?.title }}</h1>
  <v-container class="pa-6" v-if="isFetched">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-img :src="showEvent?.image" height="400px" cover />
          <v-card-title class="text-h5 font-weight-bold">{{ showEvent?.title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1">
            {{ showEvent?.location }} • {{ showEvent?.date }}
          </v-card-subtitle>
          <v-card-text>
            <p>
              -genericki-tekst-Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation 
               ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
               deserunt mollit anim id est laborum.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="router.push('/')">Back to Events</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container >
    <v-btn v-if="!favoriteStore.isInFavorites(showEvent)" color="primary" @click="favoriteStore.addToFavorites(showEvent)">Add to Favorites</v-btn>
    <v-btn v-else color="primary" @click="favoriteStore.removeFromFavorites(showEvent)">Remove From Favorites</v-btn>
  </v-container>
</template>
