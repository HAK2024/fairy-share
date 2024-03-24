'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { FormContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { AccountInfo } from './components'

export default function Account() {
  const router = useRouter()

  return (
    <FormContainer>
      <div className='flex flex-col gap-8 md:gap-6 '>
        <Heading
          title='Account'
          buttonComponent={
            <Button
              variant={'outline'}
              onClick={() => router.push('/account/edit/')}
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
