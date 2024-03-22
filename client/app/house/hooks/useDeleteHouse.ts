import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useDeleteHouseMutation } from './api'

export const useDeleteHouse = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()
  const { mutate, isPending } = useDeleteHouseMutation()

  const onDelete = (houseId: number) => {
    mutate(houseId, {
      onSuccess: () => {
        router.push('/house/create')
        toast({
          variant: 'success',
          title: 'Your house has been deleted successfully',
        })
        queryClient.clear()
      },
      onError: (error) => {
        console.error(error)
        let message = 'Please try again later.'

        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
        }
        toast({
          variant: 'destructive',
          title: 'Failed to delete the house..',
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
