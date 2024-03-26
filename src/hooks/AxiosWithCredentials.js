import axios, { AxiosRequestConfig } from "axios";
import secureLocalStorage from  "react-secure-storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Define the structure of a retry queue item
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
      const accessToken = secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
      config.headers.Authorization = (accessToken) ? `Bearer ${accessToken}` : "";
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: AxiosRequestConfig = error.config;
      const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
      
      // Return a Promise rejection if the status code is not 401 or not exists refresh token
      if (!token || error.response?.status !== 401) {
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        // Refresh the access token
        axios.post(proccess.env.REACT_APP_AUTH_API + "/auth/refresh", {})
          .then(refreshResponse => {
            return Promise.reject(error);
          })
          .catch((refreshError) => {
            return Promise.reject(refreshError);
          });
      }

      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
  );

  return axiosInstance;
};
