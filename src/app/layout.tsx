import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'フォニックス クイズ',
  description: 'アルファベットのおとをおぼえよう！',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${nunito.className} min-h-screen`} style={{ background: '#fdf6ec' }}>
        {children}
      </body>
    </html>
  );
}
