import axios, { AxiosRequestConfig } from "axios";
import secureLocalStorage from  "react-secure-storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

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
    (config) => {
      const accessToken = secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
      if (accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${accessToken}`
        };
      }
      return config;
    },
    (error) => { return Promise.reject(error) }
  );

  axiosInstance.interceptors.response.use(
    (response) => { return response },
    (error) => {
      const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
      const originalRequest: AxiosRequestConfig = error.config;
      
      // Return a Promise rejection if error occurs
      return Promise.reject(error);
    }
  );
  
  return axiosInstance;
};
