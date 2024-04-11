import { useQuery } from '@tanstack/react-query'
import { getExpensePerMonthApi } from './../../api'

export const useGetExpensePerMonthQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getExpensePerMonthApi(),
    throwOnError: true,
  })

  return { data, isLoading }
}
