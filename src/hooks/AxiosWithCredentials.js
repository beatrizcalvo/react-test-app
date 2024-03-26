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
    async (config) => {
      const token = secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`
        };
      }
      return config;
    },
    (error) => { return Promise.reject(error) }
  );

  axiosInstance.interceptors.response.use(
    (response) => { return response },
    async (error) => {
      const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
      
      // Return a Promise rejection if the status code is not 401 or not refresh token exists
      if (!token || error.response?.status !== 401) {
        return Promise.reject(error);
      }

      console.log("error 401);
      return Promise.reject(error);
  );
  
  return axiosInstance;
};
