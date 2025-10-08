import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import EventDetails from '../pages/EventDetails.vue'
import Profile from '../pages/Profile.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import CreateNewEvent from '@/pages/CreateNewEvent.vue'
const routes=[
  {path:'/', name:'Home', component: MainLayout, children: [
    { path: '',name:'home', component: Home },
    { path: 'events/:id', name: 'EventDetails', component: EventDetails },
    { path: 'profile', name: 'Profile', component: Profile },
    { path: 'createNewEvent', name: 'newEvent', component: CreateNewEvent },

  ]},
  {path:'/auth', name:'AuthLayout', component: AuthLayout, children: [
    { path: 'login', name: 'Login', component: Login },
    { path: 'register', name: 'Register', component: Register }
  ]}
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
