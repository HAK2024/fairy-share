import apiClient from '@/_api/base'

export const logoutApi = async () => {
  const response = await apiClient.post<{ message: string }>('/auth/logout')
  return response.data
}
