import { useMutation } from '@tanstack/react-query'
import { createTaskApi } from '../../api'
import { createTaskSchema } from '../../schema'

export const useCreateTaskMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (req: createTaskSchema) => {
      return createTaskApi(req)
    },
  })

  return { mutate, isPending }
}
