import axios from "axios";

const registerUser = (firstName, lastName, email, password) => {
  return axios.post(process.env.REACT_APP_AUTH_API + "/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });
};

const loginUser = (email, password) => {
  return axios.post(process.env.REACT_APP_AUTH_API + "/auth/login", {
    email,
    password
  })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = { 
  registerUser, 
  loginUser, 
  logoutUser,
  getCurrentUser
};

export default AuthService;
