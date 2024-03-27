import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useUpdateAdminMutation } from './api'
import { UpdateAdminSchema } from '../schema'

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate, isPending } = useUpdateAdminMutation()

  const onUpdate = (data: UpdateAdminSchema) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        queryClient.invalidateQueries({ queryKey: ['house'] })
        toast({
          variant: 'success',
          title: 'Admin status has been successfully updated',
        })
      },
      onError: (error) => {
        let message = 'Please try again later.'
        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
          toast({
            variant: 'destructive',
            title: 'Failed to update admin status..',
            description: message,
          })
        }
      },
    })
  }

  return {
    onUpdate,
    isPending,
  }
}
