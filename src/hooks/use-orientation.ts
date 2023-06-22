import { useEffect, useState } from "react";

export const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= window.innerHeight) {
        // 横
        setIsLandscape(true);
        setIsPortrait(false);
      } else {
        // 縦
        setIsLandscape(false);
        setIsPortrait(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isLandscape, isPortrait };
};
