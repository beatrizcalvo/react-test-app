import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

import LoadingPage from "../components/views/LoadingPage";

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
    getUserData()
      .catch(() => {// remove token})
      .finally(() => setLoadingInitial(false));
  }, []);
  
  const loginUser = (email, password) => {
    setLoadingAuth(true);
    axios.post(process.env.REACT_APP_AUTH_API + "/auth/login", {
      email,
      password
    })
      .then(response => {
        // set token
        console.log("ejecuta setToken");
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
    // remove token
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
    /*if (token && token.token_type && token.access_token) {
      return { Authorization: token.token_type.trim() + " " + token.access_token };
    } else {
      return {};
    }*/
    // get token
    return {};
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
    user,
    loadingAuth,
    errorAuth,
    successAuth,
    loginUser,
    logoutUser,
    registerUser,
    authHeader
  }), [user, loadingAuth, errorAuth, successAuth]);

  return <AuthContext.Provider value={memoedValue}>{!loadingInitial && children || <LoadingPage />}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
