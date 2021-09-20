

const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: `http://localhost:5000`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*"
    },
});

function doo () { 
    // fetch('http://localhost:5000/api/getcsrftoken', { credentials: "same-origin" }).then( (result) => {
    //     console.log(result)
    // }).catch(()=> {

    // });

    axiosInstance.get(`http://localhost:5000/api/getcsrftoken`).then( (result) => {                
        axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = result.data.data;

        

        axios.post('http://localhost:5000/api/mierda2', null, {withCredentials: true})
            .then(function(result){ 
                console.log(result)
            })

        // axiosInstance.post(`http://localhost:5000/api/http/get`, 
        //     { url: 'http://www.google.commmm' }).then( (callResult) => { 
        //         console.log(callResult);
        //     });
    });
}

doo();