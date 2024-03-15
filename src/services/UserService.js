import axios from "axios";

import { authHeader } from "AuthService";

const loggedUser = () => {
  return axios.get(process.env.REACT_APP_AUTH_API + "/users/me", { headers: authHeader() });
};

const UserService = { 
  loggedUser
};

export default UserService;
