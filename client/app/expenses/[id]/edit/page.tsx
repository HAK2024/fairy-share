'use client'

import { FormContainer, Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { EditExpenseForm } from '@/expenses/components'
import { useGetExpenseQuery } from '@/expenses/hooks/api'

export default function EditExpense({ params }: { params: { id: string } }) {
  const expenseId = Number(params.id)
  const { data: expense, isLoading } = useGetExpenseQuery(expenseId)

  return (
    <FormContainer>
      <Heading title='Edit Expense Item' />
      {isLoading || !expense ? (
        <Loading />
      ) : (
        <EditExpenseForm defaultData={expense} />
      )}
    </FormContainer>
  )
}
