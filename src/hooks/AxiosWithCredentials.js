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
      if (!refreshToken || error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // Add the original request to the queue if another call is refreshing token
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
        });
      }

      try {
        // Refresh the access token
        isRefreshing = true;
        const refreshResponse = await axios.post(baseURL + "/auth/refresh", { refresh_token: refreshToken });

        // Update the localstorage with the new access token
        const newAccessToken = refreshResponse.data.access_token;
        secureLocalStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

        // Retry all requests in the queue with the new token
        refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
          axiosInstance(config)
            .then(response => resolve(response))
            .catch(error => reject(err));
        });

        // Clear the queue
        refreshAndRetryQueue.length = 0;

        // Retry the original request
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        refreshAndRetryQueue.length = 0;
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }
  );

  return axiosInstance;
};
