import { RequestResult } from '@/model/request-result.model';
import axiosInstance from "@/core/services/axios.service"
import { ApiRoutes } from '@/router/api-routes';

export default class RequestService {
  
  public readonly apiGetToken = '/getcsrftoken'
  public readonly apiGetRequest = '/http'

  /**
   *
   * @param method
   * @param url
   * @returns Promise<RequestResult>
   */
  public call(method: string, url: string): Promise<RequestResult> {
    return axiosInstance.post(`${this.apiGetRequest}/${method}`, { url: url })
  }

  /**
   * 
   * @returns 
   */
  public getToken(): Promise<any> {
    return axiosInstance.get(this.apiGetToken);
  }  
  
}

export const requestService = new RequestService();