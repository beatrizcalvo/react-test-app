import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  function login(email, password) {
    setUser("Bbbbb");
    navigate("/");
  }

  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    user,
    login
  }), [user]);

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
