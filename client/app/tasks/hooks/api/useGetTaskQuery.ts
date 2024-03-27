import { useQuery } from '@tanstack/react-query'
import { TaskType } from '@/_types'
import { getTaskApi } from '@/tasks/api'

export const useGetTaskQuery = (taskId: number) => {
  const { data, isLoading, isError } = useQuery<TaskType>({
    queryKey: ['tasks', { id: taskId }],
    queryFn: () => getTaskApi(taskId),
    enabled: !!taskId,
    throwOnError: true,
  })

  return { data, isLoading, isError }
}
