import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { AccountSchema } from '../schema'

export const editAccountApi = async (
  userId: number,
  data: AccountSchema,
): Promise<UserType> => {
  const response = await apiClient.put<UserType>(`/me/${userId}`, data)
  return response.data
}
