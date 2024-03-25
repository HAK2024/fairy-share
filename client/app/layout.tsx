import { Montserrat } from 'next/font/google'
import './globals.css'
import { cookies } from 'next/headers'
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
  const userToken = cookies().get('token')?.value

  // throw new Error('test')

  return (
    <html lang='en'>
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
          <ReactQueryProvider>
            <div className='bg-amber-50 text-slate-800'>
              <CheckAuth userToken={userToken}>
                <main>{children}</main>
              </CheckAuth>
            </div>
            <ClientComponentsProvider />
          </ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
