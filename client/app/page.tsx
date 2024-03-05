import { Button, Heading } from '@/_components/ui'
import { Header, Footer } from './_components/layout'

export default function Home() {
  return (
    <>
      <Header />
      {/* Figma design for desktop has 120px padding for both left and right sides, but feels too much, so set it to 56px*/}
      <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
        <Heading
          title='Fairy share'
          buttonComponent={() => <Button variant={'outline'}>Rules</Button>}
        />
      </div>
      <Footer />
    </>
  )
}
