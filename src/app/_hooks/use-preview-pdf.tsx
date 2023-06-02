import { pdf } from '@react-pdf/renderer';
import { ReactElement, useCallback } from 'react';

export const usePreviewPdf = (Document: ReactElement) => {
  const previewPdf = useCallback(async () => {
    const blob = await pdf(Document).toBlob();
    const url = URL.createObjectURL(blob);

    const previewWindow = window.open(url, 'previewWindow');
    if (!previewWindow) {
      console.error('previewWindow is null !!');
      return;
    }
    previewWindow.addEventListener('load', () => {
      previewWindow.print();
    });
  }, [Document]);

  return { previewPdf };
};