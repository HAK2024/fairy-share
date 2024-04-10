import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useDeleteTaskMutation } from './api'

export const useDeleteTask = (onClose: (showTaskModal?: boolean) => void) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate, isPending } = useDeleteTaskMutation()

  const handleSuccess = () => {
    toast({ variant: 'success', title: 'Successfully deleted a task!' })
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    onClose(false)
  }

  const handleError = (error: unknown) => {
    console.error(error)
    let message = 'Please try again later.'
    if (isErrorWithMessage(error) && error.response) {
      message = error.response.data.message
    }
    toast({
      variant: 'destructive',
      title: 'Failed to delete a task..',
      description: message,
    })
  }

  const onDeleteTask = (taskId: number) => {
    mutate(taskId, { onSuccess: handleSuccess, onError: handleError })
  }

  return { onDeleteTask, isPending }
}
