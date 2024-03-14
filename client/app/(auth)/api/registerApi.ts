import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { RegisterSchema } from '../schema'

export const registerApi = async (data: RegisterSchema) => {
  const response = await apiClient.post<Omit<UserType, 'houses'>>(
    '/auth/register',
    data,
  )
  return response.data
}
