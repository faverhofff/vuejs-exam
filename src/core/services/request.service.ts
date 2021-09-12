import { RequestResult } from '@/model/request-result.model';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { ApiBaseUrl } from '../const/constants';

export default class RequestService {
  /**
   *
   * @param method
   * @param url
   * @returns Promise<RequestResult>
   */
  public call(method: string, url: string): Promise<RequestResult> {
    return axios.post(`${ApiBaseUrl}/http/${method}`, { url: url })
  }

  /**
   * 
   * @returns 
   */
  public getToken(): Promise<string> {
    return axios.get(`${ApiBaseUrl}/getcsrftoken`);
  }  

}

export const requestService = new RequestService();