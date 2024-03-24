import axios, { AxiosRequestConfig } from "axios";
import secureLocalStorage from  "react-secure-storage";

const AUTH_TOKEN_KEY = "access_token";
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
      const token = secureLocalStorage.getItem(AUTH_TOKEN_KEY);
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
      const originalRequest: AxiosRequestConfig = error.config;
      if (error.response && error.response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            // Refresh the access token
            const refreshResponse = await axios.post(baseURL + "/auth/refresh", {
              refresh_token: secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
            });

            // Update the request headers and localstorage with the new access token
            const newAccessToken = refreshResponse.access_token;
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            secureLocalStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

            // Retry all requests in the queue with the new token
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosInstance
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            // Clear the queue
            refreshAndRetryQueue.length = 0;

            // Retry the original request
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        }

        // Add the original request to the queue
        return new Promise<void>((resolve, reject) => {
          refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
        });
      }
      
      // Return a Promise rejection if the status code is not 401
      return Promise.reject(error);
    }
  );
  
  return axiosInstance;
};
