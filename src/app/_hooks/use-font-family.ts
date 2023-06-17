import { useDidmount } from '@/hooks/use-didmount';
import { useCallback, useEffect, useState } from 'react';

export type FontFamily = 'shokaki-sarari' | 'kouzan-mouhitu';

export const FONT_FAMILY: FontFamily[] = [
  "shokaki-sarari",
  "kouzan-mouhitu",
];

export const useFontFamily = () => {
  const [fontFamily, setFontFamily] = useState<FontFamily>('shokaki-sarari');
  const [isLoaded, setIsLoaded] = useState(false);

  const changeFontFamily = useCallback((value: FontFamily) => {
    setFontFamily(value);
  }, []);

  const handleSelectFontFamily = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value as FontFamily);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    document.fonts.load(`20px ${fontFamily}`).then(() => {
      setIsLoaded(true);
    });
  }, [fontFamily]);

  return { fontFamily, changeFontFamily, isLoaded, handleSelectFontFamily };
};