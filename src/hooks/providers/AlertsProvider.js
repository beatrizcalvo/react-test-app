import { createContext, useContext } from "react";

const AlertsContext = createContext();

export const AlertsProvider = ({ alerts, setAlerts, children }) => {
  
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within a AlertsContext');
  }
  return context;
};
