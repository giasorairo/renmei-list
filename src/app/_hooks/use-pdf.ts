import { PdfController } from "@/utilities/pdf-controller";
import { ReactElement, useCallback } from "react";

export const usePdf = (names: string[], company: string, department: string) => {
  const printPdf = useCallback((document: ReactElement<Document>) => {
    PdfController.print(document);
  }, []);

  const downloadPdf = useCallback((document: ReactElement<Document>) => {
    PdfController.download(document, 'download.pdf');
  }, []);
  return { downloadPdf, printPdf };
};