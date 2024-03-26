import axios, { AxiosRequestConfig } from "axios";
import secureLocalStorage from  "react-secure-storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const axiosWithCredentials = axios.create({ baseURL: process.env.REACT_APP_AUTH_API });

axiosWithCredentials.interceptors.request.use(
  async (config) => {
    const accessToken = secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
    config.headers.Authorization = (accessToken) ? `Bearer ${accessToken}` : "";
    return config;
  },
  (error) => { Promise.reject(error); }
);

axiosWithCredentials.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);

    if (!!refreshToken && error.response?.status === 401) {
      axios.post(process.env.REACT_APP_AUTH_API + "/auth/refresh", { refresh_token: refreshToken })
        .then()
        .catch(refreshError => {
          return Promise.reject(refreshError);
        });      
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  }
);

export default axiosWithCredentials;
