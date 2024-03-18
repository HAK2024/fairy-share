import { useMutation } from '@tanstack/react-query'
import { taskSchema } from '../../../_schema'
import { createTaskApi } from '../../api'

export const useCreateTaskMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (req: taskSchema) => {
      return createTaskApi(req)
    },
  })

  return { mutate, isPending }
}
