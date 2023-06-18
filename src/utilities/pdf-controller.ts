import { pdf } from '@react-pdf/renderer';
import { ReactElement } from 'react';

export class PdfController {

  static async print(document: ReactElement<Document>) {
    const blob = await pdf(document).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  }

  static async download(document: ReactElement<Document>, fileName: string) {
    const blob = await pdf(document).toBlob();
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

}
