import { apiClient } from '@/_api'

export const getExpensePerMonthApi = async () => {
  const response = await apiClient.get('/expenses/per-month')
  return response.data
}
