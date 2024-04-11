import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useGetHouseInfo, useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useCreateExpenseMutation } from './api'
import { expenseResolver, ExpenseSchema } from '../schema'

export const useCreateExpense = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()
  const houseId = useGetHouseInfo().houseId

  const { mutate, isPending } = useCreateExpenseMutation()

  const form = useForm<ExpenseSchema>({
    resolver: expenseResolver,
    // TODO: Set empty to fee if I figured out a way
    defaultValues: {
      itemName: '',
      fee: 0,
      date: null,
    },
  })

  const onCreate = (data: ExpenseSchema) => {
    const formattedData = {
      ...data,
      houseId,
    }
    mutate(formattedData, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'New expense has been created successfully',
        })
        queryClient.invalidateQueries({ queryKey: ['expensesPerMonth'] })
        queryClient.invalidateQueries({ queryKey: ['expensesPerDate'] })
        router.push('/expenses')
      },
      onError: (error) => {
        let message = 'Please try again later.'
        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
          toast({
            variant: 'destructive',
            title: 'Failed to create expense..',
            description: message,
          })
        }
      },
    })
  }

  return {
    form,
    onSubmit: form.handleSubmit(onCreate),
    isPending,
  }
}
