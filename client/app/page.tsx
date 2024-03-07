'use client'
import { Button, Heading } from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'

export default function Home() {
  // This is the sample. Please change it to todos API query.
  const { data } = useGetMeQuery()

  return (
    <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
      <Heading
        title='Fairy share'
        buttonComponent={() => <Button variant={'outline'}>Rules</Button>}
      />

      <div>{data?.name}</div>
      <div>{data?.email}</div>
    </div>
  )
}
