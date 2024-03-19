import { createContext, useContext, useMemo, useState } from 'react';

import useLocalStorage from './LocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    user
  }), [user]);

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
