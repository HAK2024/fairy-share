import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { LoginSchema } from '../schema'

export const loginApi = async (data: LoginSchema) => {
  const response = await apiClient.post<UserType>('/auth/login', data)
  return response.data
}
