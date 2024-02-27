import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FairyShare App',
  description: 'Share house chores and expenses management app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
