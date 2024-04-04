import { useMutation } from '@tanstack/react-query'
import { createExpenseApi } from '@/expenses/api'
import { CreateExpenseSchema } from '@/expenses/schema'

export const useCreateExpenseMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (req: CreateExpenseSchema) => {
      return createExpenseApi(req)
    },
  })

  return {
    mutate,
    isPending,
  }
}
