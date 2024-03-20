import { useEffect, useState } from "react";

export default function useLocalStorage(storageKey) {
  const [storedValue, setStoredValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? undefined;
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(storedValue));
  }, [storedValue, storageKey]);
  
  return [storedValue, setStoredValue];
};
