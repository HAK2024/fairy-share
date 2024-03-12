'use client'

import { Error as HouseError, TodosList } from './(todos)/components'
import { Button, Heading } from './_components/ui'
// import { Button, Heading } from './_components/ui'

export default function Home() {
  // TODO: get house data
  const house = true
  const todos = {
    houseName: 'Fairy House',
  }

  return (
    <div className='flex flex-col gap-8 px-4 pb-10 pt-8 text-slate-800 md:px-14 md:pb-20 md:pt-10 '>
      {!house && (
        <HouseError
          mainMessage='You are currently not in any house.'
          linkHref='/create-setting'
          linkText='Create house'
          additionalText='or wait for an invitation'
        />
      )}
      <Heading
        title={todos.houseName}
        buttonComponent={() => <Button variant={'outline'}>Rules</Button>}
      />
      <TodosList />
    </div>
  )
}
