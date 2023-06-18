'use client';

import Head from 'next/head';
import Script from 'next/script';

export const Fonts = () => {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap" rel="stylesheet" />;
      <link rel="stylesheet" href="fonts/fonts.css" />
    </Head>
  );
};