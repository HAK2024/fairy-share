import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useGetHouseId } from '@/_hooks'
import { toast } from '@/_hooks/useToast'
import { isErrorWithMessage } from '@/_utils'
import { updateTaskStatusApi } from './api'

export const useUpdateStatusMutation = () => {
  const queryClient = useQueryClient()

  const { houseId } = useGetHouseId()

  const { mutate, isPending } = useMutation({
    mutationFn: updateTaskStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', houseId] })
    },
    onError: (error) => {
      console.error(error)
      let message = 'Please try again later.'

      if (isErrorWithMessage(error) && error.response) {
        message = error.response.data.message
      }
      toast({
        variant: 'destructive',
        title: 'Failed to update task status..',
        description: message,
      })
    },
  })

  return { mutate, isPending }
}
