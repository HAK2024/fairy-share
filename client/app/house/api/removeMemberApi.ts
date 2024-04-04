import apiClient from '@/_api/base'

export const removeMemberApi = async (userId: number, houseId: number) => {
  const response = await apiClient.delete(`/user-houses`, {
    data: { userId, houseId },
  })
  return response.data
}
