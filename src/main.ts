import { createApp } from 'vue'
import App from './App'
import store, { key } from './store'
import router from './router'
import './assets/styles/index.css'

import { createPinia } from 'pinia'

createApp(App)
.use(store, key)
.use(createPinia())
.use(router)
.mount('#app')
