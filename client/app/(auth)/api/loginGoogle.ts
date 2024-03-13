import apiClient from '@/_api/base'
import { UserType } from '@/_types'

export const loginGoogleApi = async (code: string) => {
  const response = await apiClient.post<Omit<UserType, 'houses'>>(
    '/auth/login/google',
    {
      code,
    },
  )
  return response.data
}
