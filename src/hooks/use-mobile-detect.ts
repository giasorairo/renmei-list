import { useEffect, useState } from "react";

const getMobileDetect = (userAgent: string) => {
  const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i));
  const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = (): boolean => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = (): boolean => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = (): boolean => Boolean(userAgent.match(/SSR/i));

  const isMobile = (): boolean => Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR());

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR
  };
};

export const useMobileDetect = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isSSR, setIsSSR] = useState(false);

  useEffect(() => {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : window.navigator.userAgent;
    const { isMobile, isDesktop, isAndroid, isIos, isSSR } = getMobileDetect(userAgent);
    setIsMobile(isMobile());
    setIsDesktop(isDesktop());
    setIsAndroid(isAndroid());
    setIsIos(isIos());
    setIsSSR(isSSR());
  }, []);

  return { isMobile, isDesktop, isAndroid, isIos, isSSR };
};
