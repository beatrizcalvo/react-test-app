import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

const AUTH_TOKEN_KEY = "access_token";

export default function axiosWithCredentials (baseURL) {
  const axiosInstance = axios.create({ baseURL: baseURL });
  
  return axiosInstance(baseURL);
};
