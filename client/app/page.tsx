import { Button } from '@/_components/ui'

export default function Home() {
  let test = 'test'

  return (
    <main className='p-24'>
      Hello World!
      <p className="accent-sky-200 text-xs m-4 p-4">Text</p>
      <div className='text-sm m-4 flex gap-10 p-4 accent-sky-200'>
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
