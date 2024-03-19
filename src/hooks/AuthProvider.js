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

  function loginUser(email, password) {
    setLoadingAuth(true);
    setToken("aaaaaaa");
    setUser("Bbbbb");
    setLoadingAuth(false);
    navigate("/");
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
