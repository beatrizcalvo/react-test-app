import secureLocalStorage from "react-secure-storage";
import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosClient = axiosWithCredentials(process.env.REACT_APP_AUTH_API);

const getCurrentUser = () => { return axiosClient.get("/users/me") };
const deleteCurrentUser = () => { return axiosClient.delete("/users/me") };
const deactivateCurrentUser = () => { return axiosClient.patch("/users/me", { active: false }) };

const updateCurrentUser = (data) => { return axiosClient.patch("/users/me", {
  ...((data.firstName || data.lastName || data.secondLastName || data.gender?.description || data.birthDate 
       || data.nationality?.code) && {
    person: {
      ...((data.firstName) && {
        personName: {
          firstName: data.firstName
        },
      }),
      gender: data.gender?.description,
      birthDate: data.birthDate,
      ...(data.nationality?.code && {
        firstNationality: {
          code: data.nationality.code
        }
      })
    }
  })
})};

const getNationalities = () => { return axiosClient.get("/nationalities") };

const UsersService = { 
  getCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
  deactivateCurrentUser,
  getNationalities
};

export default UsersService;
