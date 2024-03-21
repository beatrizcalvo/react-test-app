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
    console.log("ejecuta callback");
  }, [value, key]);

  useEffect(() => {
    console.log("ejecuta effect");
  }, [value, setStoredValue]);

  return [value, setValue];  
}
