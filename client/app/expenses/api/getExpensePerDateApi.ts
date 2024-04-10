import { apiClient } from '@/_api'

export const getExpensePerDateApi = async () => {
  const response = await apiClient.get('/expenses/per-date')
  return response.data
}
