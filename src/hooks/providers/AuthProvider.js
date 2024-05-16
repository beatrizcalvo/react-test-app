import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

import LoadingPage from "../../components/views/LoadingPage";
import UsersService from "../../services/UsersService";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
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
    UsersService.getCurrentUser()
      .then(response => setUser(response.data))
      .catch(() => clearLocalStorage())
      .finally(() => setLoadingInitial(false));
  }, []);
  
  const loginUser = (email, password) => {
    setLoadingAuth(true);
    axios.post(process.env.REACT_APP_API_URL + "/auth/login", {
      email,
      password
    })
      .then(response => {
        saveLocalStorage(response.data.access_token, response.data.refresh_token);        
        UsersService.getCurrentUser()
          .then(userResponse => {
            setUser(userResponse.data)
            navigate("/")
          })
          .catch(() => {
            const errorsList = {message: "Application login error", description: "Can not get user data"};
            const error = {response: {data: {errors: [errorsList]}}};
            setErrorAuth(error);
            clearLocalStorage();
          });
      })
      .catch(error => setErrorAuth(error))
      .finally(() => setLoadingAuth(false));
  };

  const logoutUser = () => {
    clearLocalStorage();
    setUser(undefined);
    navigate("/login");
  };

  const registerUser = (firstName, lastName, email, password) => {
    setLoadingAuth(true);
    axios.post(process.env.REACT_APP_API_URL + "/auth/register", {
      firstName,
      lastName,
      email,
      password,
    })
      .then(response => setSuccessAuth(response.data))
      .catch(error => setErrorAuth(error))
      .finally(() => setLoadingAuth(false));
  };

  const updateUser = () => {
    UsersService.getCurrentUser()
      .then(response => setUser(response.data))
      .catch(() => logoutUser());
  };

  const clearLocalStorage = () => {
    secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
    secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  const saveLocalStorage = (accessToken, refreshToken) => {
    secureLocalStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    secureLocalStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  };

  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    user,
    loadingAuth,
    errorAuth,
    successAuth,
    loginUser,
    logoutUser,
    registerUser,
    updateUser
  }), [user, loadingAuth, errorAuth, successAuth]);

  return <AuthContext.Provider value={memoedValue}>{!loadingInitial && children || <LoadingPage />}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext');
  }
  return context;
};
