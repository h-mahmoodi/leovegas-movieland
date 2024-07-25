import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setState(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return state;
};

export default useDebounce;
