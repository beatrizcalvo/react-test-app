import axios from "axios";
import { createContext, useContext } from 'react';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("auth_token");

  const loginUser = (email, password) => {
    return axios.post(process.env.REACT_APP_AUTH_API + "/auth/login", {
      email,
      password
    }).then(response => {
      if (response.data.access_token) {
        setToken(JSON.stringify(response.data));
      }
      return response;
    });
  };
  
  const contextValue = {
    loginUser
  };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
