import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useDeleteExpenseMutation } from './api'

export const useDeleteExpense = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()
  const { mutate, isPending } = useDeleteExpenseMutation()

  const onDelete = (expenseId: number) => {
    mutate(expenseId, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'The expense has been deleted successfully',
        })
        queryClient.invalidateQueries({
          queryKey: ['expenses'],
        })
        router.push('/expenses')
      },
      onError: (error: unknown) => {
        console.error(error)
        let message = 'Please try again later.'

        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
        }
        toast({
          variant: 'destructive',
          title: 'Failed to delete the expense..',
          description: message,
        })
      },
    })
  }
  return {
    onDelete,
    isPending,
  }
}
