import axios, { AxiosRequestConfig } from "axios";
import secureLocalStorage from  "react-secure-storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const axiosWithCredentials = axios.create({ baseURL: process.env.REACT_APP_AUTH_API });

export default axiosWithCredentials;
