<template>
  <v-app>
    <Navbar />

    <v-main>
      <router-view />  
      <Footer />       
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
