import { RequestResult } from '@/core/model/request-result.model';
import axiosInstance from "@/core/services/axios.service"
import { LocalUrl } from '../const/api';
import { ChronosModel } from '../model/chronos.model';

export default class RequestService {
  
  public readonly apiGetToken = '/getcsrftoken'
  public readonly apiGetRequest = '/http'
  public readonly apiChronosInfo = LocalUrl + '/myjson.json'

  /**
   * Call to node endpoint 
   * and get website by specified method
   * @param method
   * @param url
   * @returns Promise<RequestResult>
   */
  public call(method: string, url: string): Promise<RequestResult> {
    return axiosInstance.post(`${this.apiGetRequest}/${method}`, { url: url })
  }

  /**
   * Get stored website query
   * @param queryId 
   * @returns 
   */
  public getSharedQuery(queryId: string): Promise<any> {
    return axiosInstance.get(`/${queryId}`);
  }  

  /**
   * 
   * @returns 
   */
  public getChronosInfo(): Promise<ChronosModel> {
    return axiosInstance.get(`${this.apiChronosInfo}`);
  }  

  /**
   * Refresh security token
   * @returns 
   */
  public getToken(): Promise<any> {
    return axiosInstance.get(this.apiGetToken);
  }  
  
}

export const requestService = new RequestService();