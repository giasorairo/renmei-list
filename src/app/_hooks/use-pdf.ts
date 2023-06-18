import { download } from "@/utilities/download";
import { useCallback } from "react";

type Parameter = {
  names: string[],
  company: string,
  department: string,
};

const usePdf = (names: string[], company: string, department: string) => {
  const fetchPdf = useCallback(() => {
    fetch('/api/pdf', {
      method: 'POST',
      body: JSON.stringify({ names, company, department }),
    })
      .then((res) => res.blob())
      .then(async (blob) => {
        download(blob, 'download.pdf');
      });
  }, [company, department, names]);

  return { fetchPdf };
};