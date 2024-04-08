'use client'

import { useRouter } from 'next/navigation'
import { InvitedHouseAlertDialog } from '@/_components/ui'
import { TodosList } from './(todos)/components'
import { useGetTodosQuery } from './(todos)/hooks'
import { Loading } from './_components/layout'
import { Button, Heading } from './_components/ui'
import { useGetHouseInfo } from './_hooks'

export default function Home() {
  const { data: todos, isLoading } = useGetTodosQuery()
  const { houseName } = useGetHouseInfo()
  const router = useRouter()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {todos && (
        <div className='flex flex-col gap-8 px-4 pb-10 pt-8 text-slate-800 md:px-14 md:pb-20 md:pt-10'>
          <Heading
            title={houseName}
            buttonComponent={
              <Button variant={'outline'} onClick={() => router.push('/rules')}>
                Rules
              </Button>
            }
          />
          <TodosList todos={todos} />
        </div>
      )}

      <InvitedHouseAlertDialog />
    </>
  )
}
