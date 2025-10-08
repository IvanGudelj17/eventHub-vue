<script setup lang="ts">
import { ref } from 'vue'
import { useEventStore } from '@/store/events.ts'

const eventStore = useEventStore()
const title = ref<string>('')
const location = ref<string>('')
const image = ref<string>('')
const date = ref<string>(new Date().toISOString().substr(0, 10)) // ⚡ string u formatu yyyy-mm-dd za <v-text-field type="date">
const errorMessage = ref<string>('')

async function handleNewEventSubmition() {
  try {
    await eventStore.createNewEvent(title.value, location.value, image.value,new Date(date.value))
    console.log('user created new event with data -', title.value, location.value, image.value, date.value)
    onClear() 
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

function onClear() {
  title.value = ''
  location.value = ''
  image.value = ''
  date.value = new Date().toISOString().substr(0, 10)
}
</script>


<template>
<h1>EDIT INFO AND SAVE DATA FOR NEW EVENT TO BE LISTED!</h1>
<v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-card class="pa-6" elevation="3" width="400">
      <v-card-text>
       <v-form @submit.prevent="handleNewEventSubmition" ref="formRef">
            <v-text-field
                v-model="title"
                label="Event Title"
                type="text"
                required
                outlined
                dense
            />
            <v-text-field
                v-model="location"
                label="Event Location"
                type="text"
                required
                outlined
                dense
            />
            <v-text-field
            v-model="date"
            label="Event Date"
            type="date"
            outlined
            dense
            />
         <v-text-field
            v-model="image"
            label="Event Image URL"
            type="text"
            outlined
            dense
        />

        <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            block
        >
            Add New Event
        </v-btn>
        <v-btn
            color="secondary"
            class="mt-2"
            block
            @click="onClear"
        >
            Clear Form
        </v-btn>

        <p v-if="errorMessage" class="error-message mt-2">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

</template>