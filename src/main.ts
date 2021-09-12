import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import { refreshHeaderTokenInterceptor } from './interceptors/axios-interceptor-header-token'

createApp(App).mount('#app')

refreshHeaderTokenInterceptor