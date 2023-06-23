import { useDidmount } from '@/hooks/use-didmount';
import { LocalStorageController } from '@/utilities/local-storage-controller';
import { LOCAL_STORAGE_KEYS } from '@/utilities/local-storage-keys';
import { useCallback, useState } from 'react';

const INITIAL_DEPARTMENT = '研究部一同';

export const useDepartment = () => {
  const [department, setDepartment] = useState('');

  const setDepartmentEnhance = useCallback((value: string) => {
    setDepartment(value);
    LocalStorageController.set<string>(LOCAL_STORAGE_KEYS.department, value);
  }, []);

  const changeDepartment = useCallback((value: string) => {
    setDepartmentEnhance(value);
  }, [setDepartmentEnhance]);

  useDidmount(() => {
    const gotDepartment = LocalStorageController.get<string>(LOCAL_STORAGE_KEYS.department);
    console.log('got', gotDepartment, typeof gotDepartment)
    if (!gotDepartment) {
      console.log('set department', INITIAL_DEPARTMENT)
      setDepartmentEnhance(INITIAL_DEPARTMENT);
      return;
    }
    setDepartmentEnhance(gotDepartment);
  });

  return { department, changeDepartment };
};