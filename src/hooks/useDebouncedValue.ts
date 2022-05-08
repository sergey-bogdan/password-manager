import { useEffect, useState } from "react";

export default function useDebouncedValue(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);


    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
}