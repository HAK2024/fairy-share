'use client'

import React from 'react'
import { FormContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { ChangePasswordForm } from '../components'

export default function ChangePasswordPage() {
  return (
    <FormContainer>
      <div className='flex flex-col gap-8 md:gap-6 '>
        <Heading title='Change Password' />
        <ChangePasswordForm />
      </div>
    </FormContainer>
  )
}
