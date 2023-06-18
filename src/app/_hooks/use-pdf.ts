import { download } from "@/utilities/download";
import { useCallback, useState } from "react";

const preview = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  window.open(url);
};

export const usePdf = (names: string[], company: string, department: string) => {
  const [loading, setLoading] = useState(false);

  const downloadPdf = useCallback(() => {
    fetch('/api/pdf', {
      method: 'POST',
      body: JSON.stringify({ names, company, department }),
    })
      .then((res) => res.blob())
      .then(async (blob) => {
        download(blob, 'download.pdf');
      });
  }, [company, department, names]);

  const printPdf = useCallback(async () => {
    setLoading(true);
    await fetch('/api/pdf', {
      method: 'POST',
      body: JSON.stringify({ names, company, department }),
    })
      .then((res) => res.blob())
      .then(async (blob) => {
        preview(blob);
      })
      .catch(() => {});
    setLoading(false);
  }, [company, department, names]);

  return { downloadPdf, printPdf, loading };
};