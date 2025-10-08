import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Vuetify importi
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@/assets/style.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#121212',
          surface: '#1E1E1E', 
          primary: '#460991ff', 
          secondary: '#03DAC6',
          accent: '#FF4081',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
  components,
  directives,
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(vuetify) 
app.mount('#app')
