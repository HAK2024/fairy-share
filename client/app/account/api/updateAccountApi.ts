import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { AccountSchema } from '../schema'

export const updateAccountApi = async (
  data: AccountSchema,
): Promise<UserType> => {
  const response = await apiClient.put<UserType>('/me/', data)
  return response.data
}
