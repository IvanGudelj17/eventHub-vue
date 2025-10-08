<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useEventStore } from '@/store/events'
import { computed, onMounted, ref } from 'vue'
import { useFavoriteStore } from '@/store/favorites'
import type { Event as EventType } from '@/types/types.ts'
import { UseAuthStore } from '@/store/auth'

const showEvent = ref<null | EventType>(null)

const router = useRouter()
const eventStore = useEventStore()
const favoriteStore = useFavoriteStore()
const authStore = UseAuthStore()
const eventId = Number(router.currentRoute.value.params.id)
const isFetched = ref(false)

const loggedIn = computed(()=>!!authStore.user && !!authStore.token)
onMounted(async() => {
  if (!authStore.user) await authStore.fetchUser()
  const event = eventStore.getEventById(eventId)
    if (event) {
      showEvent.value = event
      isFetched.value = true
    } else {
      console.warn('Event not found in store!')
    }
    })
const addFavorite = async () => {
  if (!authStore.user) {
    console.warn('User not logged in yet')
    return
  }
  await favoriteStore.addToFavorites(eventId, authStore.user.id)
}
const removeFromFavoritess = async () => {
    console.log('btn clicked')
  if (!authStore.user) {
    console.warn('User not logged in yet')
    return
  }
  console.log(eventId, authStore.user.id)
  await favoriteStore.removeFromFavorites(eventId, authStore.user.id)
}
</script>

<template>
  <v-container v-if="isFetched && showEvent" class="pa-6">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-img :src="showEvent.image || 'https://picsum.photos/200/300'" height="400px" cover />
          <v-card-title class="text-h5 font-weight-bold">{{ showEvent.title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1">
            {{ showEvent.location }} • {{ new Date(showEvent.date).toLocaleDateString() }}
          </v-card-subtitle>

          <v-card-text>
            <p>
              -generički-tekst- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="router.push('/')">Back to Events</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="loggedIn" class="text-center mt-4">
      <v-btn
        v-if="!favoriteStore.isInFavorites(showEvent)"
        color="primary"
        @click="addFavorite"
      >
        Add to Favorites
      </v-btn>

      <v-btn
        v-else
        color="secondary"
        @click="removeFromFavoritess"
      >
        Remove From Favorites
      </v-btn>
    </div>
    <div v-else class="text-center mt-4">
      <p>To add event in Favorites, make sure you are logged in!</p>
    </div>
  </v-container>

  <div v-else class="text-center mt-10">
    <v-progress-circular indeterminate color="primary" size="48" />
    <p>Loading event details...</p>
  </div>
</template>
