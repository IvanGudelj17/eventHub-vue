import {defineStore} from 'pinia'
import axios from 'axios'

export const UseAuthStore = defineStore('auth',{
    state:()=>({
        token : localStorage.getItem('token') || '',
        user: null as null | {id:number, email: string}
    }),
    getters:{
        isLoggedIn: (state) => !!state.token && !!state.user,
    },
    actions: {
      async register(email: string, password: string) {
        try {
          await axios.post('http://localhost:3000/auth/register', {email,password});
          await this.login(email, password);
        } catch (err: any) {throw new Error(err.response?.data?.error || 'Registration failed')}
      },
      async login(email:string, password: string){
        try{
            const res = await axios.post('http://localhost:3000/auth/login', {email,password})
            this.token = res.data.token
            localStorage.setItem('token',this.token)
            localStorage.setItem('email',email)
            localStorage.setItem('password',password)
            console.log('DATA ->',this.token, localStorage.getItem('token'), email)
            await this.fetchUser()
    }catch(err: any){throw new Error(err.response?.data?.error || 'Login failed')}},
      async fetchUser() {
        if (!this.token) return
        if (this.user) return this.user

        try {
          const res = await axios.get('http://localhost:3000/auth/me', {
            headers: { Authorization: `Bearer ${this.token}` }
          })
          this.user = { id: res.data.id, email: res.data.email }
          console.error('this user-> ',this.user)
          return this.user
        } catch (err: any) {
          console.error('Fetch user failed', err)
          this.logout()
        }
      },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      console.log(this.token,this.user,localStorage.getItem('email'))
    }
  }
}
)