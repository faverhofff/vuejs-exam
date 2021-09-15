import App from './App.vue'
import router from './router';
import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import { refreshHeaderTokenInterceptor } from './interceptors/axios-interceptor-header-token';

createApp(App)
    .use(router)
    .mount('#app')

refreshHeaderTokenInterceptor();
