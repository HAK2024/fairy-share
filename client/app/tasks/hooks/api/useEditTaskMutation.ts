import { useMutation } from '@tanstack/react-query'
import { editTaskApi } from '@/tasks/api'
import { taskSchema } from '../../schema'

export const useEditTaskMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ taskId, data }: { taskId: number; data: taskSchema }) => {
      return editTaskApi(taskId, data)
    },
  })

  return { mutate, isPending }
}
