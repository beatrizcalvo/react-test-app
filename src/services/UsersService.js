import secureLocalStorage from "react-secure-storage";
import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosClient = axiosWithCredentials(process.env.REACT_APP_AUTH_API);

const getCurrentUser = () => { return axiosClient.get("/users/me") };
const deleteCurrentUser = () => { return axiosClient.delete("/users/me") };
const updateCurrentUser = (data) => { return axiosClient.patch("/users/me", {
    gender: data.gender?.description,
    ...(!!data.nationality?.code && {
      firstNationality: {
        code: data.nationality.code
      }
    })
  }
})};
const deactivateCurrentUser = () => { return axiosClient.patch("/users/me", { active: false }) };

const getNationalities = () => { return axiosClient.get("/nationalities") };

const UsersService = { 
  getCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
  deactivateCurrentUser,
  getNationalities
};

export default UsersService;
