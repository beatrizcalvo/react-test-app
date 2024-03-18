import axios from "axios";
import { createContext, useContext, useState, useEffect } from 'react';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("auth_token");
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setUser({fullName: "Prueba"});
    };

    fetchData();
  }, []);
  
  const loginUser = (email, password) => {
    return axios.post(process.env.REACT_APP_AUTH_API + "/auth/login", {
      email,
      password
    }).then(response => {
      setToken(response.data);
      getUserData().then(res => setUser(res.data));
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

  const authHeader = () => {
    if (token && token.token_type && token.access_token) {
      return { Authorization: token.token_type.trim() + " " + token.access_token };
    } else {
      return {};
    }
  };

  const getUserData = () => {
    return axios.get(process.env.REACT_APP_AUTH_API + "/users/me", { 
      headers: authHeader()
    });
  };
  
  const contextValue = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    authHeader
  };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
