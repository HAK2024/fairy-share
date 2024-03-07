'use client'
import { Button, Heading } from '@/_components/ui'
import { useAuthStore } from '@/_store'
import { Header, Footer } from './_components/layout'

export default function Home() {
  const currentUser = useAuthStore((state) => state.currentUser)
  return (
    <>
      <Header />
      <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
        <Heading
          title='Fairy share'
          buttonComponent={() => <Button variant={'outline'}>Rules</Button>}
        />
      </div>

      <div>{currentUser?.name}</div>
      <Footer />
    </>
  )
}
