import axios from "axios";
import { createContext, useContext, useState, useMemo } from 'react';

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
      setToken(response.data);
      return response;
    });
  };

  const logoutUser = () => {
    setToken(undefined);
    setUser(undefined);
  };

  const registerUser = (firstName, lastName, email, password) => {
    
  };

  const authHeader = () => {
    if (token && token.token_type && token.access_token) {
      return { Authorization: token.token_type.trim() + " " + token.access_token };
    } else {
      return {};
    }
  };

  const contextValues = useMemo(() => ({
    user,
    loginUser,
    logoutUser,
    registerUser
  }), [user]);
  
  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
