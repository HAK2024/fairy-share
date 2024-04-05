import { useQuery } from '@tanstack/react-query'
import { TaskTypeWithUser } from '@/_types'
import { getTasksApi } from '@/tasks/api'

export const useGetTasksQuery = (year: number, month: number) => {
  const { data, isLoading } = useQuery<TaskTypeWithUser[]>({
    queryKey: ['tasks', { year, month }],
    queryFn: () => getTasksApi(year, month),
    throwOnError: true,
  })

  return { data, isLoading }
}
