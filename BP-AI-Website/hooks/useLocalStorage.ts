import { useState } from "react";

const getInitialValue = (key: string, initialValue: any) => {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;

  const initialStoredValue = storedValue
    ? JSON.parse(storedValue)
    : initialValue;

  return initialStoredValue;
};

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Retrieve the value from localStorage on initial render
  const [value, setValue] = useState<T>(getInitialValue(key, initialValue));

  // Update the localStorage whenever the value changes
  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}

export default useLocalStorage;
