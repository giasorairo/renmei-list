
import { useCallback } from 'react';

export const usePreviewPdf = (blob: Blob) => {
  const previewPdf = useCallback(async () => {
    const url = URL.createObjectURL(blob);

    const previewWindow = window.open(url, 'previewWindow');
    if (!previewWindow) {
      console.error('previewWindow is null !!');
      return;
    }
    previewWindow.addEventListener('load', () => {
      previewWindow.print();
    });
  }, [blob]);

  return { previewPdf };
};