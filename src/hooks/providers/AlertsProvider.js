import { createContext, useContext } from "react";

const AlertsContext = createContext();

export const AlertsProvider = ({ alerts, setAlerts, children }) => {
  
  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    alerts
  }), [alerts]);

  return <AlertsContext.Provider value={memoedValue}>{children}</AlertsContext.Provider>;
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within a AlertsContext');
  }
  return context;
};
