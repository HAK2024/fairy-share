import { Button, Heading } from '@/_components/ui'

export default function Home() {
  return (
    <div>
      <Heading
        title='Fairy share'
        // TODO: There might be a better way to switch between two different size of Button component depending on the screen size?
        buttonComponent={() => (
          <>
            <Button variant={'outline'} className='block md:hidden'>
              Rules
            </Button>
            <Button variant={'outline'} className='hidden md:block'>
              Rules
            </Button>
          </>
        )}
      />
    </div>
  )
}
