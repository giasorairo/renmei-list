'use client'

import style from './page.module.scss';
import { RenmeiList } from '@/components/renmai-list/renmei-list';
import { usePdfValue } from './_hooks/use-pdf-value';

export default function Pdf() {
  const { names, company, department } = usePdfValue();

  return (
    <div className={style.page}>
      <RenmeiList names={names} company={company} department={department}  />
    </div>
  );
}
