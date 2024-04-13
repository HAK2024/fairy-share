'use client'

import { useRouter } from 'next/navigation'
import { Loading, PageContainer } from '@/_components/layout'
import { InvitedHouseAlertDialog } from '@/_components/ui'
import { Button, Heading } from '@/_components/ui'
import { TodosList } from './(todos)/components'
import { useGetTodosQuery } from './(todos)/hooks'
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
        <PageContainer className='flex flex-col gap-8'>
          <Heading
            title={houseName}
            buttonComponent={
              <Button variant={'outline'} onClick={() => router.push('/rules')}>
                Rules
              </Button>
            }
          />
          <TodosList todos={todos} />
        </PageContainer>
      )}

      <InvitedHouseAlertDialog />
    </>
  )
}
