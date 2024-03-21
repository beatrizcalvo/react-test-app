import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(newValue => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [value, key]);

  useEffect(() => {
    setStoredValue(value);
  }, [value, setStoredValue]);

  return [value, setValue];  
}
