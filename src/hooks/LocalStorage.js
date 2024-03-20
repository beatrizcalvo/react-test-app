import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
      try {
        console.log("Recupera token");
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : undefined;
      } catch (error) {
        return undefined;
      }
    });
  
    useEffect(() => {
      try {
        console.log("update token");
        console.log("JSON.stringify(value));
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }, [key, value]);
  
    return [value, setValue];
};
