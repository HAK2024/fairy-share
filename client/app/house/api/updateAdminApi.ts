import apiClient from '@/_api/base'

type UpdateAdminType = {
  userId: number
  houseId: number
  isAdmin: boolean
}

export const updateAdminApi = async (data: UpdateAdminType) => {
  const response = await apiClient.put(`/user-houses/admin`, data)
  return response.data
}
