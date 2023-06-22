import { SEO } from '@/components/seo/seo';
import './globals.css';

export const metadata = {
  title: '連名作成アプリ',
  description: '連名を作成するアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#fff" />
      </head>
      <SEO title='作成ページ' />
      <body>
        {children}
      </body>
    </html>
  )
}
