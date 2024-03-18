import { useMutation } from '@tanstack/react-query'
import { createTaskApi } from '../../api'
import { taskSchema } from '../../../_schema'

export const useCreateTaskMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (req: taskSchema) => {
      return createTaskApi(req)
    },
  })

  return { mutate, isPending }
}
