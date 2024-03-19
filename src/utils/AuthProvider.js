import axios from "axios";
import { createContext, useContext, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("auth_token");
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  const loginUser = (email, password) => {
    setToken("aaaaaaa");
    setUser("Bbbbb");
    navigate("/");
  };

  const logoutUser = () => {
    setToken(undefined);
    setUser(undefined);
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
    }).then(response => {
      setUser(response.data);
      return response;
    });
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
