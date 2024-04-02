import apiClient from '@/_api/base'

export const deleteAccountApi = async (userId: number, houseId: number) => {
  const response = await apiClient.delete<{ message: string }>(`/me/${houseId}`)
  return response.data
}
