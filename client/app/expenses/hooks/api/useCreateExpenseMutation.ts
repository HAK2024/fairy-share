import { useMutation } from '@tanstack/react-query'
import { createExpenseApi } from '@/expenses/api'
import { ExpenseSchema } from '@/expenses/schema'

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
