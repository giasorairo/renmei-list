'use client'

import html2canvas from 'html2canvas';
import type { Options as HtmlCanvasOptions } from 'html2canvas';
import { useCallback } from 'react';

import styles from './page.module.css';

export default function Home() {

  const handlerClickScreenshot = useCallback(() => {
    const options: Partial<HtmlCanvasOptions> = {
      width: 300,
      height: 300,
    };

    html2canvas(document.body, options).then((canvas) => {
      document.body.appendChild(canvas);
      const url = canvas.toDataURL();
      const anchor = document.createElement('a');
      anchor.download = '名簿.png';
      anchor.href = url;
      anchor.click();
      anchor.remove();
    });
  }, []);

  return (
    <main>
      <div
        className={styles['renmei-list']}
      >
        山田太郎
      </div>
      <button
        onClick={handlerClickScreenshot}
      >
        screen shot
      </button>
    </main>
  )
}
