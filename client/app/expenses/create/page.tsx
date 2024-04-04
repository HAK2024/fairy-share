'use client'

import { FormContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { ExpenseCreateForm } from '../components'

export default function ExpenseCreatePage() {
  return (
    <FormContainer>
      <Heading title='Create Expense Item' />
      <ExpenseCreateForm />
    </FormContainer>
  )
}
