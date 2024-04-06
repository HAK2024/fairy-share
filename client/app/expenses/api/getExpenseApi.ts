import { apiClient } from '@/_api'

export const getExpenseApi = async (expenseId: number) => {
  const response = await apiClient.get(`/expenses/${expenseId}`)
  return response.data
}
