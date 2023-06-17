import { useCallback, useState } from 'react';

export const useDepartment = () => {
  const [department, setDepartment] = useState('研究部一同');

  const changeDepartment = useCallback((value: string) => {
    setDepartment(value);
  }, []);

  return { department, changeDepartment };
};