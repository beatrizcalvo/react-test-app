import axios from "axios";
import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
  const [token, setToken] = useLocalStorage("auth_token");
  const [user, setUser] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigate = useNavigate();

  const loginUser = (email, password) => {
    setLoadingAuth(true);
    axios.post(process.env.REACT_APP_AUTH_API + "/auth/login2", {
      email,
      password
    })
      .then(response => {
        setToken(response.data);
        setUser("Bbbbb");
        navigate("/");
      })
      .catch(error => setErrorAuth(error))
      .finally(() => setLoadingAuth(false));
  };

  const logoutUser = () => {
    setToken(undefined);
    setUser(undefined);
    navigate("/login");
  };


  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    user,
    loadingAuth,
    errorAuth,
    loginUser,
    logoutUser
  }), [user, loadingAuth, errorAuth]);

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
