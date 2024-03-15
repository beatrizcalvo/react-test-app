import axios from "axios";

import AuthService from "./AuthService";

const loggedUser = () => {
  return axios.get(process.env.REACT_APP_AUTH_API + "/users/me", { headers: AuthService.authHeader() });
};

const UserService = { 
  loggedUser
};

export default UserService;
