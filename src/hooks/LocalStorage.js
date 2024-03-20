import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      } catch (error) {
        return undefined;
      }
    });

  const setNewValue = (newValue) => {
    try {
      console.log("newValue: " + JSON.stringify(newValue));
      const valueToStore =
        newValue instanceof Function ? newValue(storedValue) : newValue;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      console.log("update value: " + JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setNewValue];
};
