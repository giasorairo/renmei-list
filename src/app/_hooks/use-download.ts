import { RefObject, useCallback } from 'react';

export const useImageDownload = (canvasRef: RefObject<HTMLCanvasElement>) => {
  // canvas to png
  const handleClickDownloadButton = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }
    const url = canvasRef.current.toDataURL();
    const anchor = document.createElement('a');
    anchor.download = 'renmei-list.png';
    anchor.href = url;
    anchor.click();
    anchor.remove();
  }, [canvasRef]);

  return { handleClickDownloadButton };
};