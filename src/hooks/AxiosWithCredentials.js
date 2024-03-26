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

    console.log(originalRequest._retry);
    
    return Promise.reject(error);
  }
);

export default axiosWithCredentials;
