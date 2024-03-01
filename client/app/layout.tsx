import { Montserrat } from 'next/font/google'
import './globals.css'
import { Footer, Header } from './_components/ui'
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
        <main className='min-h-screen bg-amber-100'>
          <Header />
          {/* Figma design for desktop has 120px padding for both left and right sides, but feels too much, so set it to 56px*/}
          <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
