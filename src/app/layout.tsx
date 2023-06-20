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
      <body>
        {children}
      </body>
    </html>
  )
}
