import apiClient from '@/_api/base'
import { UserType } from '@/_types'

export const getMeApi = async (): Promise<UserType> => {
  const response = await apiClient.get<UserType>('/me')
  return response.data
}
