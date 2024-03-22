import secureLocalStorage from "react-secure-storage";
import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosCredentials = axiosWithCredentials(process.env.REACT_APP_AUTH_API); 

const getCurrentUser = () => { return axiosCredentials.get("/users/me") };

const UsersService = { 
  getCurrentUser
};

export default UsersService;
