import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

const axiosInstance = Axios.create({ baseURL: baseURL });

axiosInstance.interceptors.request.use(
  async (config) => { return config },
  (error) => { Promise.reject(error) }
);

export default const useAxiosWithCrendetials = (baseURL) => {
  return axiosInstance;
};
