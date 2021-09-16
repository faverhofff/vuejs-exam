import App from './App.vue'
import router from './router';
import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { refreshHeaderTokenInterceptor } from './interceptors/axios-interceptor-header-token';

createApp(App)
    .use(router)
    .mount('#app')

refreshHeaderTokenInterceptor();
