import { createContext, useContext, useMemo } from "react";

const AlertsContext = createContext();

interface AlertType {
  variant: string
};

export const AlertsProvider = ({ alerts, setAlerts, children }) => {

  const addNewAlert = (variant) => {
    const newAlert: AlertType = {
      variant: variant
    };
    setAlerts(prevAlertsArray => [...prevAlertsArray, newAlert]);
  };
  
  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    alerts,
    addNewAlert
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