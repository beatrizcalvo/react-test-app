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

      if (refreshToken && error.response && error.response.status === 401) {
        try {
          // Refresh the access token
          const refreshResponse = await axios.post(baseURL + "/auth/refresh", { refresh_token2: refreshToken });

          // Update the localstorage with the new access token
          const newAccessToken = refreshResponse.data.access_token;
          secureLocalStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          throw refreshError;
        }
      }
      
      // Return a Promise rejection if the status code is not 401
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
