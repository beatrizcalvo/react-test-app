export default function useLocalStorage(key, initialValue = null) {

  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const setStoredValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? fn(newValue) : newValue;
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [getStoredValue, setStoredValue];  
}
