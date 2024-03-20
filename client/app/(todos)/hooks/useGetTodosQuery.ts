import { useQuery } from '@tanstack/react-query'
import { useGetHouseId } from '@/_hooks'
import { TodoType } from '@/_types'
import { getTodosApi } from '../api'

export const useGetTodosQuery = () => {
  const { houseId } = useGetHouseId()

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
