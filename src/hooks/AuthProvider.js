import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useLocalStorage from "./LocalStorage";
import LoadingPage from "../components/views/LoadingPage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [successAuth, setSuccessAuth] = useState(undefined);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Reset error and success states if we change page
  useEffect(() => {
    if (errorAuth) setErrorAuth(undefined);
    if (successAuth) setSuccessAuth(undefined);
  }, [location]);

  // Check if there is a currently active session when the provider is mounted for the first time.
  // If there is an error, it means there is no session.
  // Finally, just signal the component that the initial load is over.
  useEffect(() => {
    getUserData()
      .catch(() => setToken(undefined))
      .finally(() => setLoadingInitial(false));
  }, []);
  
  const loginUser = (email, password) => {
    setLoadingAuth(true);
    axios.post(process.env.REACT_APP_AUTH_API + "/auth/login", {
      email,
      password
    })
      .then(response => {
        setToken(response.data);
        console.log(JSON.stringify(token));
        getUserData()
          .then(() => navigate("/"))
          .catch(() => {
            const errorsList = {message: "Application login error", description: "Can not get user data"};
            const error = {response: {data: {errors: [errorsList]}}};
            setErrorAuth(error);
          });
      })
      .catch(error => setErrorAuth(error))
      .finally(() => setLoadingAuth(false));
  };

  const logoutUser = () => {
    setToken(undefined);
    setUser(undefined);
    navigate("/login");
  };

  const registerUser = (firstName, lastName, email, password) => {
    setLoadingAuth(true);
    axios.post(process.env.REACT_APP_AUTH_API + "/auth/register", {
      firstName,
      lastName,
      email,
      password,
    })
      .then(response => setSuccessAuth(response.data))
      .catch(error => setErrorAuth(error))
      .finally(() => setLoadingAuth(false));
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

  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    token, 
    user,
    loadingAuth,
    errorAuth,
    successAuth,
    loginUser,
    logoutUser,
    registerUser,
    authHeader
  }), [token, user, loadingAuth, errorAuth, successAuth]);

  return <AuthContext.Provider value={memoedValue}>{!loadingInitial && children || <LoadingPage />}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
