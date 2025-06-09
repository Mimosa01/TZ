import { useEffect, useState } from "react";

export function useDebounce<T> (value: T, delay: number): T {
  const [ debouceValue, setDebounceValue ] = useState<T>(value);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutID);
    }
  });

  return debouceValue;
}