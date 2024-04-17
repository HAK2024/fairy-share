import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useRemoveMemberMutation } from './api'

export const useRemoveMember = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { mutate, isPending } = useRemoveMemberMutation()

  const onRemove = (userId: number, houseId: number) => {
    mutate(
      { userId, houseId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['house'] })
          queryClient.invalidateQueries({ queryKey: ['me'] })

          toast({
            variant: 'success',
            title: 'The member has been successfully removed from the house',
          })
        },
        onError: (error) => {
          console.error(error)
          let message = 'Please try again later.'

          if (isErrorWithMessage(error) && error.response) {
            message = error.response.data.message
          }
          toast({
            variant: 'destructive',
            title: 'Failed to remove the member from the house..',
            description: message,
          })
        },
      },
    )
  }
  return {
    onRemove,
    isPending,
  }
}
