<script lang="ts" setup>
import {UseAuthStore} from '@/store/auth.ts'
import {useRouter} from 'vue-router'
const authStore = UseAuthStore()
const router = useRouter()
function handleLogout(){
  authStore.logout()
  router.push("/auth/register")
}

</script>
<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>EventHub</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <div v-if="!authStore.isLoggedIn">
    <v-btn  text to="/auth/login">Login</v-btn>
    <v-btn  text to="/auth/register">Register</v-btn>
    </div>
    <div v-else>
    <v-btn  text  @click="handleLogout">Log Out</v-btn>
    <v-btn  text to="/profile">Profile</v-btn>
    </div>
  </v-app-bar>
</template>