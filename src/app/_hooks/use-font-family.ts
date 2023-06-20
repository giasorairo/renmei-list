import { useDidmount } from '@/hooks/use-didmount';
import { useCallback, useEffect, useState } from 'react';

export type FontFamily = {
  name: string,
  src: string,
};

export const fontFamilies: FontFamily[] = [
  {
    name: 'yuji-syuku',
    src: '/fonts/YujiSyuku-Regular.ttf',
  },
  {
    name: 'shippori-mincho-bold',
    src: '/fonts/ShipporiMincho-Bold.ttf',
  },
  {
    name: 'kouzan-mouhitu',
    src: '/fonts/kouzan-mouhitu.otf',
  },
  {
    name: 'shokaki-sarari',
    src: '/fonts/shokaki-sarari.ttf',
  },
  {
    name: 'stick',
    src: '/fonts/Stick-Regular.ttf',
  },
  {
    name: 'noto-serif-jp',
    src: '/fonts/NotoSerifJP-Regular.otf',
  },
];

export const useFontFamily = () => {
  const [fontFamily, setFontFamily] = useState<FontFamily>(fontFamilies[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  const changeFontFamily = useCallback((value: FontFamily) => {
    setFontFamily(value);
  }, []);

  const handleSelectFontFamily = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectFontFamily = fontFamilies.find((_fontFamily) => _fontFamily.name === e.target.value);
    if (!selectFontFamily) {
      return;
    }
    setFontFamily(selectFontFamily);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    // これ、いらんかも
    document.fonts.load(`20px ${fontFamily.name}`).then(() => {
      setIsLoaded(true);
    });
  }, [fontFamily]);

  return { fontFamily, changeFontFamily, isLoaded, handleSelectFontFamily };
};