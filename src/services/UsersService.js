import secureLocalStorage from "react-secure-storage";
import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosClient = axiosWithCredentials(process.env.REACT_APP_AUTH_API);

const getCurrentUser = () => { return axiosClient.get("/users/me") };
const deleteCurrentUser = () => { return axiosClient.delete("/users/me") };

const UsersService = { 
  getCurrentUser,
  deleteCurrentUser
};

export default UsersService;
