import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 300) {
  const [isDebounce, setIsDebounce] = useState<string>(value);
  useEffect(() => {
    const timeout = setTimeout(() => setIsDebounce(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return isDebounce;
}
