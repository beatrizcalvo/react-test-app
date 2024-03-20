import { useEffect, useState } from 'react';

export default function useLocalStorage(key) {
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    console.log("getItem(): " + value);
  }, []);
  
  useEffect(() => {
    console.log("setItem(): " + value);
  }, [value]);
  
    return [value, setValue];
};
