import axios, { AxiosRequestConfig } from "axios";
import secureLocalStorage from  "react-secure-storage";

const AUTH_TOKEN_KEY = "access_token";

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

export default function axiosWithCredentials (baseURL) {
  const axiosInstance = axios.create({ baseURL: baseURL });
  const refreshAndRetryQueue: RetryQueueItem[] = [];
  let isRefreshing = false;

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
    async (error) => {
      const originalRequest: AxiosRequestConfig = error.config;
      if (error.response && error.response.status === 401) {
        
      }
      return Promise.reject(error);
    }
  );
  
  return axiosInstance;
};
