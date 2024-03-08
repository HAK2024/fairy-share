import { useQuery } from '@tanstack/react-query'
import { TodoType } from '@/_types'
import { getTodosApi } from './api'

export const useGetTodosQuery = (houseId: number) => {
  return useQuery<TodoType>({
    queryKey: ['todos', houseId],
    queryFn: () => getTodosApi(houseId),
    enabled: !!houseId, // Send request only when houseId exists
  })
}
