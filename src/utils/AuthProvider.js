import axios from "axios";
import { createContext, useContext, useState, useEffect } from 'react';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("auth_token");
  const [user, setUser] = useState(undefined);

  const loginUser = (email, password) => {
    return axios.post(process.env.REACT_APP_AUTH_API + "/auth/login", {
      email,
      password
    }).then(response => {
      setToken(JSON.stringify(response.data));
      return response;
    });
  };

  const logoutUser = () => {
    setUser(undefined);
    setToken(undefined);
  };

  const registerUser = (firstName, lastName, email, password) => {
    return axios.post(process.env.REACT_APP_AUTH_API + "/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
  };
  
  const contextValue = {
    user,
    loginUser,
    logoutUser,
    registerUser
  };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
