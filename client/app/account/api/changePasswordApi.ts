import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { PasswordSchema } from '../schema'

export const changePasswordApi = async (
  data: PasswordSchema,
): Promise<UserType> => {
  const response = await apiClient.put<UserType>('/me/change-password', data)
  return response.data
}
