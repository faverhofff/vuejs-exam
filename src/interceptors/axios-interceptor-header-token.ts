import axios from 'axios';

export const refreshHeaderTokenInterceptor = () => {
  axios.interceptors.response.use(
    async (config: any) => {
      // const token = axios.defaults.headers.common['X-CSRF-TOKEN'];
      // if (token == undefined ) {
      //   await requestService.getToken()
        // .then(token => {
        //   axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        // })
      // }

      return config;
    },
    (err: any) => {
      return Promise.reject(err);
    },
  );
};
