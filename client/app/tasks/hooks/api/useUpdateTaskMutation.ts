import { useMutation } from '@tanstack/react-query'
import { updateTaskApi } from '@/tasks/api'
import { taskSchema } from '../../schema'

export const useUpdateTaskMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ taskId, data }: { taskId: number; data: taskSchema }) => {
      return updateTaskApi(taskId, data)
    },
  })

  return { mutate, isPending }
}
