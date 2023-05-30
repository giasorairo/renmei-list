import { RefObject, useCallback, useState } from 'react';

export const useCanvasToBase64 = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [canvasBase64, setCanvasBase64] = useState('');
  const convertCanvasToBase64 = useCallback(() => {
    if (!canvasRef.current) {
      return '';
    }

    const base64 = canvasRef.current.toDataURL('image/png', 1);
    setCanvasBase64(base64);
  }, [canvasRef]);

  return { canvasBase64, convertCanvasToBase64 }
};