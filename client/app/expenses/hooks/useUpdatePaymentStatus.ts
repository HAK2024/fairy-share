import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/_hooks/useToast'
import { isErrorWithMessage } from '@/_utils'
import { updatePaymentStatusApi } from '../api'

export const useUpdatePaymentStatusMutation = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updatePaymentStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expensesPerMonth'],
        exact: true,
      })
      queryClient.invalidateQueries({
        queryKey: ['expensesPerDate'],
        exact: true,
      })
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      console.error(error)
      let message = 'Please try again later.'

      if (isErrorWithMessage(error) && error.response) {
        message = error.response.data.message
      }
      toast({
        variant: 'destructive',
        title: 'Failed to update payment status..',
        description: message,
      })
    },
  })

  return { mutate, isPending }
}
