import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("auth_token");
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function loginUser(email, password) {
    setLoading(true);
    setToken("aaaaaaa");
    setUser("Bbbbb");
    setLoading(false);
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
    loading,
    error,
    loginUser,
    logoutUser
  }), [user, loading, error]);

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
