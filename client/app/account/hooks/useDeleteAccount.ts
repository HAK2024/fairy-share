import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/_hooks'
import { resetAllStores } from '@/_stores'
import { isErrorWithMessage } from '@/_utils'
import { useDeleteAccountMutation } from './api'

export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()
  const { mutate, isPending } = useDeleteAccountMutation()

  const onDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        resetAllStores()
        queryClient.clear()
        router.push('/register')
        toast({
          variant: 'success',
          title: 'Your account has been deleted successfully',
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
          title: 'Failed to delete the account.',
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
