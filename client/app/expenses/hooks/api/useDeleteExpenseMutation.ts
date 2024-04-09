import { useMutation } from '@tanstack/react-query'
import { deleteExpenseApi } from '../../api'

export const useDeleteExpenseMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (expenseId: number) => {
      return deleteExpenseApi(expenseId)
    },
  })

  return {
    mutate,
    isPending,
  }
}
