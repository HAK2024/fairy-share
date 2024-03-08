'use client'
import { TodosList } from './(todos)/components'
// import { Button, Heading } from './_components/ui'

// TODO: get house data

export default function Home() {
  return (
    <div className='flex flex-col gap-8 px-4 pb-10 pt-8 text-slate-800 md:px-14 md:pb-20 md:pt-10 '>
      {/* <Heading
        title={todos.houseName}
        buttonComponent={() => <Button variant={'outline'}>Rules</Button>}
      /> */}
      <TodosList />
    </div>
  )
}
