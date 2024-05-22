import axiosWithCredentials from "../hooks/AxiosWithCredentials";

const axiosClient = axiosWithCredentials(process.env.REACT_APP_API_URL);

const getCurrentUser = () => { return axiosClient.get("/users/me") };
const deleteCurrentUser = () => { return axiosClient.delete("/users/me") };
const deactivateCurrentUser = () => { return axiosClient.patch("/users/me", { active: false }) };

const updateCurrentUser = (data) => { return axiosClient.patch("/users/me", {
  ...((data.firstName || data.lastName || data.secondLastName || data.gender?.description || data.birthDate 
       || data.nationality?.code) && {
    person: {
      ...((data.firstName || data.lastName || data.secondLastName) && {
        personName: {
          firstName: data.firstName,
          lastName: data.lastName,
          secondLastName: data.secondLastName
        },
      }),
      gender: data.gender?.description,
      birthDate: data.birthDate,
      ...(data.nationality?.code && {
        firstNationality: {
          code: data.nationality.code
        }
      })
    },
    contactPoint: {
      addressLines: ["Prueba 1", "Prueba 2"]
    }
  })
})};

const UsersService = { 
  getCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
  deactivateCurrentUser
};

export default UsersService;
