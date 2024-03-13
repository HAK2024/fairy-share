import { Montserrat } from 'next/font/google'
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {
  ReactQueryProvider,
  CheckAuth,
  ClientComponentsProvider,
} from '@/_providers'
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
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
          <ReactQueryProvider>
            <main className='min-h-svh bg-amber-50 text-slate-800'>
              <CheckAuth>{children}</CheckAuth>
            </main>
            <ClientComponentsProvider />
          </ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
