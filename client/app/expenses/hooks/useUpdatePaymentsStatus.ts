import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/_hooks/useToast'
import { isErrorWithMessage } from '@/_utils'
import { useUpdatePaymentsStatusMutation } from './api'
import { UpdatePaymentsStatusType } from '../types'

export const useUpdatePaymentsStatus = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useUpdatePaymentsStatusMutation()

  const onUpdate = (data: UpdatePaymentsStatusType) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['expensesPerMonth'],
        })
        queryClient.invalidateQueries({
          queryKey: ['expensesPerDate'],
        })
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
      onError: (error: unknown) => {
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
  }

  return { onUpdate, isPending }
}
