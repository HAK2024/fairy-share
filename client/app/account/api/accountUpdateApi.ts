import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { AccountSchema } from '../schema'

export const accountUpdateApi = async (userId: number, data: AccountSchema) => {
  const response = await apiClient.put<UserType>(`/me/${userId}`, data)
  return response.data
}
