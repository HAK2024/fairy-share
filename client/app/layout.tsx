import { Montserrat } from 'next/font/google'
import './globals.css'
import { ClientComponentsProvider, ReactQueryProvider } from '@/_providers'
import type { Metadata } from 'next'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FairyShare App',
  description: 'Share house chores and expenses management app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryProvider>
          {/* TODO: Show different layouts depending on the screen */}
          <main className='min-h-svh bg-amber-100 text-slate-800'>
            {children}
          </main>
          <ClientComponentsProvider />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
