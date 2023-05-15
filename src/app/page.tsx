'use client'

import { NamePanels } from './components/name-panels/name-panels';
import styles from './page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { COMPANY_PLATE_SIZE, NAME_PLATE_SIZE } from './components/const/const';
import { CompanyPlate } from './components/company-plate/compan-plate';
import { Button } from '@/components/button/button';

const getWindowSize = () => {
  const width = window.innerHeight;
  const height = window.innerWidth;
  return { width, height }
}

export default function Home() {

  const [names, setNames] = useState([
    '山田一郎',
    '山田二郎',
    '山田三郎',
    '山田四郎',
    '山田五郎',
    '山田六郎',
    '山田七郎',
    '山田八郎',
    '',
    '山田十郎'
  ]);

  const handlerChangeName = useCallback((string: string, index: number) => {
    const namesCopy = [...names];
    namesCopy[index] = string;
    setNames(namesCopy);
  }, [names, setNames]);

  const handlerClickAddRow = useCallback(() => {
    setNames((prev) => [...prev, '', '']);
  }, []);

  const numberOfLine = names.length / 2;
  const width = numberOfLine * NAME_PLATE_SIZE.width + (numberOfLine - 1) * 30 + (30 * 2) + COMPANY_PLATE_SIZE.width;

  const [companyName, setCompanyName] = useState('株式会社');

  const handleChangeCompanyName = useCallback((string: string) => {
    setCompanyName(string);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.renmeiList}>
        <svg viewBox={`0 0 ${width} 290`} width={width} height={290}>
          <NamePanels names={names} onChangeNames={handlerChangeName} numberOfLine={numberOfLine} />
          <CompanyPlate name={companyName} onChangeName={handleChangeCompanyName} position={{ x: 20, y: 100 }} />
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          display: 'flex',
          flexFlow: 'column',
          gap: '8px',
        }}
      >
        <Button color="outlineBlack" onClick={handlerClickAddRow}>
          名前の行を追加
        </Button>
        <Button color="black">
          ダウンロード
        </Button>
      </div>
    </div>
  )
};
