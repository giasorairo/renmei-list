'use client'

import { useSearchParams } from 'next/navigation';
import style from './page.module.scss';
import { RenmeiPdf } from '@/components/renmai-pdf/renmei-pdf';
import { usePdfValue } from './_hooks/use-pdf-value';

export default function Pdf() {
  const { names, company, department } = usePdfValue();

  return (
    <div className={style.page}>
      <RenmeiPdf names={names} company={company} department={department}  />
    </div>
  );
}
