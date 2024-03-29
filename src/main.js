import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/reset.scss'
import './assets/styles/main.scss'
// import '@/assets/styles/main.scss'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
