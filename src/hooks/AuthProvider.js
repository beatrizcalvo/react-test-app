import axios from "axios";
import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const connectionError = "Cannot connect to the user registration server.";
  
  const [token, setToken] = useLocalStorage("auth_token");
  const [user, setUser] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigate = useNavigate();

  function loginUser(email, password) {
    setLoadingAuth(true);

    axios.post(process.env.REACT_APP_AUTH_API + "/auth/login2", {
      email,
      password
    }).then(token => {
      setToken("aaaaaaa");
      setUser("Bbbbb");
      navigate("/");
    }).catch(error => {
      let errorMessage =
        (error.response && error.response.data && 
          (error.response.data.errors[0].message + " - " + error.response.data.errors[0].description)) 
        || connectionError;
      setErrorAuth(errorMessage);
    }).finally(() => setLoadingAuth(false));
  };

  function logoutUser() {
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
