import { useMutation } from '@tanstack/react-query'
import { updateExpenseApi } from './../../api'
import { ExpenseSchema } from '../../schema'

export const useUpdateExpenseMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      expenseId,
      data,
    }: {
      expenseId: number
      data: ExpenseSchema
    }) => {
      return updateExpenseApi(expenseId, data)
    },
  })

  return { mutate, isPending }
}
