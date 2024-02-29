import { Button } from '@/_components/ui'

export default function Home() {
  return (
    <main>
      <p className='text-xs p-4'>Hello World!</p>
      <div className='text-sm m-4 flex gap-10 p-4'>
        <Button variant={'destructive'}>Click me</Button>
        <Button variant={'outline'} disabled>
          Click me
        </Button>
        <Button variant={'secondary'} disabled>
          Click me
        </Button>
        <Button variant={'ghost'}>Click me</Button>
        <Button variant={'link'}>Click me</Button>
        <Button disabled>Click me</Button>
        <Button type='submit' isLoading>
          Click me
        </Button>
      </div>
    </main>
  )
}
