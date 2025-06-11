import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
import 'normalize.css'
// import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import '@/assets/styles/index.scss'

import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)
// app.use(ElementPlus)
app.mount('#app')
