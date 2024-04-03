import apiClient from '@/_api/base'
import { UpdateAdminType } from '../type'

export const updateAdminApi = async (data: UpdateAdminType) => {
  const response = await apiClient.put(`/user-houses/admin`, data)
  return response.data
}
