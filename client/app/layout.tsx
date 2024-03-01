import { Montserrat } from 'next/font/google'
import './globals.css'
import { Button, Footer, Header, Heading } from './_components/ui'
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
        <Header />
        <div className='h-screen bg-amber-100 p-4 md:p-16'>
          <Heading
            title='Fairy share'
            buttonComponent={() => <Button>Edit</Button>}
          />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  )
}
