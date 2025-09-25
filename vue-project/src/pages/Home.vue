<script setup lang="ts">
import { ref } from 'vue'
import { useEventStore } from '../store/events'

const eventStore = useEventStore()
   
</script>

<template>
  <v-container class="pa-6">
    <h1 class="text-h4 font-weight-bold mb-6 text-center">🎉 Upcoming Events</h1>

    <v-row>
      <v-col
        v-for="event in eventStore.events"
        :key="event.id"
        cols="12"
        sm="6"
        md="4"
      >
      
        <v-card max-width="350" class="mx-auto">
          <v-img :src="event.image" height="200" cover />

          <v-card-title>{{ event.title }}</v-card-title>
          <v-card-subtitle>
            {{ event.location }} • {{ event.date }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="primary" :to="`/events/${event.id}`">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
