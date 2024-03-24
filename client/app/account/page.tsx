'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { FormContainer, Loading } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'
import { AccountInfo } from './components'

export default function Account() {
  const router = useRouter()
  const { data: user, isLoading } = useGetMeQuery()
  console.log('user>>>', user)
  console.log('id>>>', user.id)

  if (isLoading || !user) return <Loading />
  // TODO: error handling

  return (
    <FormContainer>
      <div className='flex flex-col gap-8 md:gap-6 '>
        <Heading
          title='Account'
          buttonComponent={
            <Button
              variant={'outline'}
              onClick={() => router.push(`/account/${user.id}/edit/`)}
            >
              <FiEdit />
              &nbsp;Edit
            </Button>
          }
        />
        <AccountInfo />
        <div>
          <Button
            variant={'destructiveOutline'}
            size='sm'
            className='flex gap-1'
          >
            <FiTrash />
            Delete Your Account
          </Button>
        </div>
      </div>
    </FormContainer>
  )
}
