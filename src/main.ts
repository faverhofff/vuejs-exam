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
        .then(token => {             
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token.data.data; 

            console.log(token.data.data);
            // fetch('http://localhost:5000/api/http/GET', {
            //     credentials: 'same-origin', // <-- includes cookies in the request
            //     headers: {
            //       'CSRF-Token': token.data.data // <-- is the csrf token as a header
            //     },
            //     method: 'POST',
            //     // body: {
                 
            //     // }
            //   })

        } );
}