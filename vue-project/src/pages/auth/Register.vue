<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-card class="pa-6" elevation="3" width="400">
      <v-card-title class="text-h5 justify-center">
        Register
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegistration" ref="formRef">
          <v-text-field
            v-model="userEmail"
            label="Email"
            type="email"
            required
            :rules="[emailRule]"
            outlined
            dense
            autocomplete="email"
          />
          <v-text-field
            v-model="userPassword"
            label="Password"
            type="password"
            required
            :rules="[passwordRule]"
            outlined
            dense
            autocomplete="current-password"

          />
          <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            block
          >
            Register
          </v-btn>
          <p v-if="errorMessage" class="error-message mt-2">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UseAuthStore } from '@/store/auth.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = UseAuthStore()

const userEmail = ref('')
const userPassword = ref('')
const errorMessage = ref('')

// Validacijska pravila
const emailRule = (v: string) => !!v && v.includes('@') || 'Invalid email'
const passwordRule = (v: string) => !!v && v.length >= 3 || 'Password must be at least 3 characters'

async function handleRegistration() {
  try {
    await authStore.register(userEmail.value, userPassword.value)
    console.log('user is successfuly registered -', userEmail.value, userPassword.value)
    router.push('/profile')
  } catch (error: any) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
