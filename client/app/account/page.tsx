'use client'

import React from 'react'
import { Loading } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'

export default function Rules() {
  const { data: me, isLoading } = useGetMeQuery()

  if (isLoading || !me) return <Loading />
  /* TODO: error handling */

  return (
    <>
      <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
        <Heading
          title='Account'
          buttonComponent={<Button variant={'outline'}>Edit</Button>}
        />
      </div>
    </>
  )
}
