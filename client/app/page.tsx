import { Button, Heading } from '@/_components/ui'

export default function Home() {
  return (
    <div>
      <Heading
        title='Fairy share'
        buttonComponent={() => <Button variant={'outline'}>Rules</Button>}
      />
    </div>
  )
}
