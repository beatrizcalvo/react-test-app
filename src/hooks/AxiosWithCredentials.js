import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

const AUTH_TOKEN_KEY = "access_token";
const axiosInstance = (baseURL) => { return axios.create({ baseURL: baseURL }) };

export default function useAxiosWithCrendetials (baseURL) {
  return axiosInstance(baseURL);
};
