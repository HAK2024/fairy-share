import apiClient from '@/_api/base'

export const deleteAccountApi = async () => {
  const response = await apiClient.delete<{ message: string }>('/me')
  return response.data
}
