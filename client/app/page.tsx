'use client'

import { useRouter } from 'next/navigation'
import { Alert as NoHouseAlert, TodosList } from './(todos)/components'
import { useGetTodosQuery } from './(todos)/hooks'
import { Loading } from './_components/layout'
import { Button, Heading } from './_components/ui'

export default function Home() {
  const { data: todos, isError, isLoading } = useGetTodosQuery()
  const router = useRouter()

  if (isLoading) {
    return <Loading isCenter />
  }

  // TODO: Replace this with the error component
  if (isError) {
    return <p>Failed to load data.</p>
  }

  return (
    <div className='flex flex-col gap-8 px-4 pb-10 pt-8 text-slate-800 md:px-14 md:pb-20 md:pt-10 '>
      {!todos ? (
        <NoHouseAlert
          mainMessage='You are currently not in any house.'
          // TODO: Replace the linkHref with the actual path
          linkHref='/create-setting'
          linkText='Create house'
          additionalText='or wait for an invitation'
        />
      ) : (
        <>
          <Heading
            title={todos.houseName}
            buttonComponent={() => (
              <Button variant={'outline'} onClick={() => router.push('/rules')}>
                Rules
              </Button>
            )}
          />
          <TodosList todos={todos} />
        </>
      )}
    </div>
  )
}
