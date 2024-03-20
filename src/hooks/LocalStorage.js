import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
      try {
        console.log("get initial value");
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : undefined;
      } catch (error) {
        return undefined;
      }
    });

  useEffect(() => {
    console.log("actualizado valor");
  }, [key, value]);

  const setStateValue = (newValue) => {
    try {
      console.log("update value: " + JSON.stringify(newValue));
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error(error);
    }
  };
  
  return [value, setStateValue];
};
