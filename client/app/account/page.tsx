'use client'

import React from 'react'
import { FormContainer, Loading } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'
import { AccountInfo } from './component/AccountInfo'

export default function Account() {
  const { data: user, isLoading } = useGetMeQuery()

  if (isLoading || !user) return <Loading />
  /* TODO: error handling */

  return (
    <FormContainer>
      <div className='flex flex-col gap-8 md:gap-6 '>
        <Heading
          title='Account'
          buttonComponent={<Button variant={'outline'}>Edit</Button>}
        />
        <AccountInfo user={user} />
        <div>
          <Button variant={'destructive'}>Delete your Account</Button>
        </div>
      </div>
    </FormContainer>
  )
}
