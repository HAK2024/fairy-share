import { useQuery } from '@tanstack/react-query'
import { TaskTypeWithUser } from '@/_types'
import { getTasksApi } from '@/tasks/api'

export const useGetTasksQuery = () => {
  const { data, isLoading } = useQuery<TaskTypeWithUser[]>({
    queryKey: ['tasks'],
    queryFn: () => getTasksApi(),
    throwOnError: true,
  })

  return { data, isLoading }
}
