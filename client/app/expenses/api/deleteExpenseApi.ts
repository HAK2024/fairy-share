import apiClient from '@/_api/base'

export const deleteExpenseApi = async (expenseId: number) => {
  const response = await apiClient.delete(`/expenses/${expenseId}`)
  return response.data
}
