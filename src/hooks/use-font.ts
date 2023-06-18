import { getFont } from '@/utilities/get-font';
import { useDidmount } from './use-didmount';
import { useState } from 'react';

export const useFont = (fontFamily: string) => {
  const [loaded, setLoaded] = useState(false);
  
  useDidmount(async () =>  {
    // await getFont(fontFamily);
    setLoaded(true);
  });

  return { loaded };
};