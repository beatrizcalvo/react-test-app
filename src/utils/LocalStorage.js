import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
      try {
        const storedValue = window.localStorage.getItem(key);
	(storedValue) ? console.log("defined") : console.log("undefined");
        return undefined;
      } catch (error) {
		console.error(error);
        return undefined;
      }
    });
  
    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }, [key, value]);
  
    return [value, setValue];
};
