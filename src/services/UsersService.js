import secureLocalStorage from "react-secure-storage";
import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosClient = axiosWithCredentials(process.env.REACT_APP_AUTH_API);

const getCurrentUser = () => { return axiosClient.get("/users/me") };
const deleteCurrentUser = () => { return axiosClient.delete("/users/me") };
const updateCurrentUser = (data) => { return axiosClient.patch("/users/me", {
  person: {
    personName: {
      
    },
    genderD: data.gender
  }
})};
const deactivateCurrentUser = () => { return axiosClient.patch("/users/me", { active: false })};

const UsersService = { 
  getCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
  deactivateCurrentUser
};

export default UsersService;
