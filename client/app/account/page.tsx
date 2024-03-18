'use client'

import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { FormContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { AccountInfo } from './component'

export default function Account() {
  return (
    <FormContainer>
      <div className='flex flex-col gap-8 md:gap-6 '>
        <Heading
          title='Account'
          buttonComponent={
            <Button variant={'outline'}>
              <FiEdit />
              &nbsp;Edit
            </Button>
          }
        />
        <AccountInfo />
        <div>
          <Button variant={'destructive'}>Delete your Account</Button>
        </div>
      </div>
    </FormContainer>
  )
}
