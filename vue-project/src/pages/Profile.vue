<script setup lang="ts">
import { useFavoriteStore } from '@/store/favorites'
import { UseAuthStore } from '@/store/auth.ts'
import { computed, onMounted, ref } from 'vue'

const favoriteStore = useFavoriteStore()
const authStore = UseAuthStore()

const anyFavoriteExist = computed(() => favoriteStore.favoriteEvents.length > 0)

onMounted(async () => {
  await authStore.fetchUser()
  if(authStore.user){
    await favoriteStore.fetchFavorites(authStore.user?.id)
    favoriteStore.isLoaded = true
  }
})
</script>

<template>
  <v-container class="pa-6">
    <v-row>
      <!-- Left side: Profile info -->
      <v-col cols="12" md="4">
        <v-card elevation="3" class="pa-4" rounded="xl">
          <v-card-title class="text-h6 font-weight-bold">
             Profile Info
          </v-card-title>
          <v-divider class="mb-4"></v-divider>

            <v-img src="https://i.pravatar.cc/150?img=12" />
          <p class="text-body-1 font-weight-medium mb-2">
            Name: <span class="font-weight-regular">{{ authStore.user?.email.split('@')[0] }}</span>
          </p>
          <p><strong>Email:</strong> {{ authStore.user?.email }}</p>
            <v-card-actions>
            <v-btn color="primary" variant="outlined" block>
              Edit Profile
            </v-btn>
              
          </v-card-actions>
          <v-btn color="primary" variant="outlined" to="/createNewEvent" block>
             Create New Event
            </v-btn>
        </v-card>
      </v-col>

      <!-- Right side: Favorites -->
      <v-col cols="12" md="8">
        <v-card elevation="3" class="pa-4" rounded="xl">
          <v-card-title class="text-h6 font-weight-bold">
            Favorite Events
          </v-card-title>
          <div v-if="!favoriteStore.isLoaded">
            <v-progress-circular indeterminate color="primary" />
          </div>

          <v-divider class="mb-4"></v-divider>
          <div v-if="!anyFavoriteExist">
            <p class="text-body-1 text-grey-darken-1">
              You don't have any favorite events yet.
            </p>
          </div>

          <v-row v-else>
            <v-col
              v-for="event in favoriteStore.favoriteEvents"
              :key="event.id"
              cols="12"
              sm="6"
              md="6"
            >
              <v-card max-width="350" elevation="2" class="mx-auto" rounded="lg">
                <v-img :src="event.image || 'https://picsum.photos/200/300'" height="160" cover />
                <v-card-title>{{ event.title }}</v-card-title>
                <v-card-subtitle>
                  {{ event.location }} • {{ event.date }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
