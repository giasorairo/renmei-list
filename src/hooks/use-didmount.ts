import { useEffect } from 'react';

export const useDidmount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};