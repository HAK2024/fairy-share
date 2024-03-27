import { useQuery } from '@tanstack/react-query'
import { useGetHouseInfo } from '@/_hooks'
import { TodoType } from '@/_types'
import { getTodosApi } from '../api'

export const useGetTodosQuery = () => {
  const { houseId } = useGetHouseInfo()

  const { data, isLoading, isError } = useQuery<TodoType>({
    queryKey: ['todos', houseId],
    queryFn: () => getTodosApi(houseId),
    enabled: !!houseId, // Send request only when houseId exists
    throwOnError: true,
  })

  return {
    data,
    isLoading,
    isError,
  }
}
