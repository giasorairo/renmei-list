import { useCallback, useState } from 'react';

export const useCompany = () => {
  const [company, setCompany] = useState('株式会社山田印刷');

  const changeCompany = useCallback((value: string) => {
    setCompany(value);
  }, []);

  return { company, changeCompany };
};