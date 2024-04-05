'use client'

import { FormContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { CreateExpenseForm } from '../components'

export default function ExpenseCreatePage() {
  return (
    <FormContainer>
      <Heading title='Create Expense Item' />
      <CreateExpenseForm />
    </FormContainer>
  )
}
