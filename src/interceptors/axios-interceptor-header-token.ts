import axiosInstance from "@/core/services/axios.service"
import { requestService } from "@/core/services/request.service";
import { ApiRoutes } from "@/router/api-routes";

export const refreshHeaderTokenInterceptor = () => {
  axiosInstance.interceptors.response.use(
    async (config: any) => {
      const originalConfig = config;
      if (originalConfig.config.url !== requestService.apiGetToken && config.data) {
        if (config.data.status == '403') {

          try {
            const accessToken = await requestService.getToken();
            axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = accessToken.data.data;

            return axiosInstance.request(originalConfig.config)
          } catch (_error) {
            return config;
          }
        }
      }


      return config;
    },
    (err: any) => {
      return Promise.reject(err);
    },
  );
};
