import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import { requestService } from './core/services/request.service';

createApp(App).mount('#app')

const token = axios.defaults.headers.common['X-CSRF-TOKEN'];
if (token == undefined ) {
    requestService
        .getToken()
        .then(token => axios.defaults.headers.common['X-CSRF-TOKEN'] = token.data );
}