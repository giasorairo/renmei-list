import { getFont } from '@/utilities/get-font';
import { useDidmount } from '../../../../hooks/use-didmount';
import { FONT_FAMILY } from '@/app/_components/renmai-list-canvas/const';
import { useState } from 'react';

export const useFont = (fontFamily: string) => {
  const [loaded, setLoaded] = useState(false);
  
  useDidmount(async () =>  {
    // await getFont(fontFamily);
    setLoaded(true);
  });

  return { loaded };
};