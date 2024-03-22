import apiClient from '@/_api/base'

export const deleteHouseApi = async (houseId: number) => {
  const response = await apiClient.delete<{ message: string }>(
    `/houses/${houseId}`,
  )
  return response.data
}
