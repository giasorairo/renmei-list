import { useDidmount } from '@/hooks/use-didmount';
import { LocalStorageController } from '@/utilities/local-storage-controller';
import { LOCAL_STORAGE_KEYS } from '@/utilities/local-storage-keys';
import { useCallback, useState } from 'react';

const INITIAL_COMPANY = '株式会社山田印刷';

export const useCompany = () => {
  const [company, setCompany] = useState('');

  const setCompanyEnhance = useCallback((value: string) => {
    setCompany(value);
    LocalStorageController.set<string>(LOCAL_STORAGE_KEYS.company, value);
  }, []);

  const changeCompany = useCallback((value: string) => {
    setCompanyEnhance(value);
  }, [setCompanyEnhance]);

  useDidmount(() => {
    const gotCompany = LocalStorageController.get<string>(LOCAL_STORAGE_KEYS.company);
    if (!gotCompany) {
      setCompanyEnhance(INITIAL_COMPANY);
      return;
    }
    setCompanyEnhance(gotCompany);
  });

  return { company, changeCompany };
};