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

  // console.log('user>>>', user)

  return (
    <>
      {/* <div className='flex w-[600px] flex-col px-4 pb-10 pt-8 md:rounded md:bg-amber-100 md:px-14 md:pb-20 md:pt-10'> */}
      {/* <div className='hidden md:block'> */}
      <FormContainer>
        <Heading
          title='Account'
          buttonComponent={<Button variant={'outline'}>Edit</Button>}
        />
        <AccountInfo user={[user]} />
        <Button variant={'destructive'}>Delete your Account</Button>
      </FormContainer>
      {/* </div> */}
      {/* </div> */}
    </>
  )
}
