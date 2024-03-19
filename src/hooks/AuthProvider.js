import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
  const [token, setToken] = useLocalStorage("auth_token");
  const [user, setUser] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Reset the error state if we change page
  useEffect(() => {
    if (errorAuth) setErrorAuth(undefined);
  }, [location]);

  // Check if there is a currently active session when the provider is mounted for the first time.
  //
  // Finally, just signal the component that the initial load is over.
  useEffect(() => {
    setLoadingInitial(false);
  }, []);

  const loginUser = (email, password) => {
    setLoadingAuth(true);
    axios.post(process.env.REACT_APP_AUTH_API + "/auth/login", {
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

  const registerUser = () => {};

  const authHeader = () => {};

  const getUserData = () => {};

  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    user,
    loadingAuth,
    errorAuth,
    loginUser,
    logoutUser,
    registerUser,
    authHeader
  }), [user, loadingAuth, errorAuth]);

  return <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
