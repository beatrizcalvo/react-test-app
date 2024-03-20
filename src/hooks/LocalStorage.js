import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : undefined;
      } catch (error) {
        return undefined;
      }
    });

  const setStateValue = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
      console.log("update value: " + JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [value, setStateValue];
};
