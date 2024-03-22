import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

const AUTH_TOKEN_KEY = "access_token";

export default function axiosWithCredentials (baseURL) {
  const axiosInstance = axios.create({ baseURL: baseURL });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = secureLocalStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => Promise.reject(error)
  );
  
  return axiosInstance;
};
