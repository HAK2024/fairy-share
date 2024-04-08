import { apiClient } from '@/_api'
import { ExpenseSchema } from '../schema'

export const updateExpenseApi = async (
  expenseId: number,
  data: ExpenseSchema,
) => {
  const response = await apiClient.put(`/expenses/${expenseId}`, data)
  return response.data
}
