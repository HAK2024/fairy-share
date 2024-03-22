import { useMutation } from '@tanstack/react-query'
import { deleteTaskApi } from '@/tasks/api'

export const useDeleteTaskMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (taskId: number) => {
      return deleteTaskApi(taskId)
    },
  })

  return { mutate, isPending }
}
