import { useMutation } from '@tanstack/react-query'
import { createExpenseApi } from '../../api'
import { ExpenseSchema } from '../../schema'

export const useCreateExpenseMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (req: ExpenseSchema) => {
      return createExpenseApi(req)
    },
  })

  return {
    mutate,
    isPending,
  }
}
