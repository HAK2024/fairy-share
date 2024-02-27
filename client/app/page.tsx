import { Button, SubmitButton } from '@/_components/ui';

export default function Home() {
  return (
    <main className='p-24'>
      Hello World!
      <p className='text-xs'>Text</p>
      <div className='flex gap-10'>
        <Button variant={'destructive'}>Click me</Button>
        <Button variant={'outline'}>Click me</Button>
        <Button variant={'secondary'}>Click me</Button>
        <Button variant={'ghost'}>Click me</Button>
        <Button variant={'link'}>Click me</Button>
        <Button>Click me</Button>
        <Button type='submit'>Click me</Button>
        <SubmitButton actionText='Submit' />
      </div>
    </main>
  );
}
