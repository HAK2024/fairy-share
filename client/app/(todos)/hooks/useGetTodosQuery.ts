import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/_stores'
import { TodoType } from '@/_types'
import { getTodosApi } from './api'

export const useGetTodosQuery = () => {
  const getHouseId = useAuthStore((state) => state.getHouseId)
  const houseId = getHouseId()

  const { data, isLoading, isError } = useQuery<TodoType>({
    queryKey: ['todos', houseId],
    queryFn: () => getTodosApi(houseId),
    enabled: !!houseId, // Send request only when houseId exists
  })

  return {
    data,
    isLoading,
    isError,
  }
}
