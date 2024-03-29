import { createContext, useContext, useMemo } from "react";

const AlertsContext = createContext();

interface AlertType {
  id: string,
  variant: string,
  message: string
};

export const AlertsProvider = ({ alerts, setAlerts, children }) => {

  const addNewAlert = (variant, message) => {
    const newAlert: AlertType = {
      id: "alert_" + alerts.length + 1,
      variant: variant,
      message: message
    };
    setAlerts(prevAlertsArray => [...prevAlertsArray, newAlert]);
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(item => item.id !== id));
  };
  
  // Make the provider update only when it should
  const memoedValue = useMemo(() => ({
    alerts,
    addNewAlert,
    removeAlert
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
