<script setup lang="ts">
import { useFavoriteStore } from '@/store/favorites'

const favoriteStore = useFavoriteStore()
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

          <v-avatar size="100" class="mb-4">
            <v-img src="https://i.pravatar.cc/150?img=12" />
          </v-avatar>

          <p class="text-body-1 font-weight-medium mb-2">
            Name: <span class="font-weight-regular">Guest User</span>
          </p>
          <p class="text-body-1 font-weight-medium mb-2">
            Email: <span class="font-weight-regular">Not logged in</span>
          </p>
          <p class="text-body-1 font-weight-medium">
            Bio: <span class="font-weight-regular">Will be editable after login</span>
          </p>

          <v-card-actions>
            <v-btn color="primary" variant="outlined" block>
              Edit Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Right side: Favorites -->
      <v-col cols="12" md="8">
        <v-card elevation="3" class="pa-4" rounded="xl">
          <v-card-title class="text-h6 font-weight-bold">
            Favorite Events
          </v-card-title>
          <v-divider class="mb-4"></v-divider>

          <div v-if="favoriteStore.favoriteEvents.length === 0">
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
                <v-img :src="event.image" height="160" cover />
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
