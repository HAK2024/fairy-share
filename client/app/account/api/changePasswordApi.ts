import apiClient from '@/_api/base'
import { PasswordSchema } from '../schema'

export const changePasswordApi = async (
  data: PasswordSchema,
): Promise<{ message: string }> => {
  const response = await apiClient.put<{ message: string }>(
    '/me/change-password',
    data,
  )
  return response.data
}
