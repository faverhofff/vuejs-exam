import axios from "axios";
import { ApiBaseUrl } from "../const/api";

const instance = axios.create({
    baseURL: ApiBaseUrl,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
export default instance;