import { apiClient } from '@/_api'
import { CreateExpenseSchema } from '../schema'

export const createExpenseApi = async (data: CreateExpenseSchema) => {
  const response = await apiClient.post('/expenses', data)
  return response.data
}
