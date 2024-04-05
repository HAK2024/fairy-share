import { apiClient } from '@/_api'
import { ExpenseSchema } from '../schema'

export const createExpenseApi = async (data: ExpenseSchema) => {
  const response = await apiClient.post('/expenses', data)
  return response.data
}
