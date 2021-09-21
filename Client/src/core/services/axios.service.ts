import axios from "axios";
import { ApiBaseUrl } from "./../const/api";

// console.log(ApiBaseUrl);

const instance = axios.create({
    baseURL: ApiBaseUrl,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  });
  
export default instance;