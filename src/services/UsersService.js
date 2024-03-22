import  secureLocalStorage  from  "react-secure-storage";
import useAxiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosCredentials = useAxiosWithCredentials(process.env.REACT_APP_AUTH_API); 

const getCurrentUser = () => { return axiosCredentials.get("/users/me") };

const UsersService = { 
  getCurrentUser
};

export default UsersService;
