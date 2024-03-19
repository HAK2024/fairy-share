import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUserHouseApi } from '@/_api'
import { isErrorWithMessage } from '../../_utils'
import { toast } from '../useToast'

export const useCreateUserHouseMutation = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (houseId: string) => {
      return createUserHouseApi(houseId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: () => {
      let message = 'Please try again later.'

      if (isErrorWithMessage(error) && error.response) {
        message = error.response.data.message
      }

      toast({
        variant: 'destructive',
        title: 'Failed to create house..',
        description: message,
      })

      // TODO: Check if the error boundary catch the error
      throw new Error(message)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
