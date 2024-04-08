import { useQuery } from '@tanstack/react-query'
import { ExpenseType } from '@/_types'
import { getExpenseApi } from './../../api'

export const useGetExpenseQuery = (expenseId: number) => {
  const { data, isLoading } = useQuery<ExpenseType>({
    queryKey: ['expenses', { id: expenseId }],
    queryFn: () => getExpenseApi(expenseId),
    enabled: !!expenseId,
    throwOnError: true,
  })

  return { data, isLoading }
}
