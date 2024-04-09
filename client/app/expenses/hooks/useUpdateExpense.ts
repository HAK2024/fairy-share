import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { ExpenseType } from '@/_types'
import { isErrorWithMessage } from '@/_utils'
import { useUpdateExpenseMutation } from './api'
import { ExpenseSchema, expenseResolver } from '../schema'

export const useUpdateExpense = (defaultData: ExpenseType) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const { mutate, isPending } = useUpdateExpenseMutation()

  const form = useForm<ExpenseSchema>({
    resolver: expenseResolver,
    defaultValues: {
      itemName: defaultData.itemName,
      fee: defaultData.fee,
      date: new Date(defaultData.date),
    },
  })

  const handleSuccess = () => {
    toast({ variant: 'success', title: 'Successfully updated the expense!' })
    queryClient.invalidateQueries({
      queryKey: ['expenses'],
    })
    router.push('/expenses')
  }

  const handleError = (error: unknown) => {
    console.error(error)
    let message = 'Please try again later.'
    if (isErrorWithMessage(error) && error.response) {
      message = error.response.data.message
    }
    toast({
      variant: 'destructive',
      title: 'Failed to update the expense..',
      description: message,
    })
  }

  const onUpdateExpense = (data: ExpenseSchema) => {
    mutate(
      { expenseId: defaultData.id, data },
      { onSuccess: handleSuccess, onError: handleError },
    )
  }

  return {
    form,
    onSubmit: form.handleSubmit(onUpdateExpense),
    isPending,
  }
}
