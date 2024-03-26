import secureLocalStorage from "react-secure-storage";
import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const getCurrentUser = () => { return axiosWithCredentials.get("/users/me") };

const UsersService = { 
  getCurrentUser
};

export default UsersService;
