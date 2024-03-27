import apiClient from '@/_api/base'
import { UpdateAdminSchema } from '../schema'

export const updateAdminApi = async (data: UpdateAdminSchema) => {
  const response = await apiClient.put(`/user-houses/admin`, data)
  return response.data
}
