import apiClient from '@/_api/base'
import { UserType } from '@/_types'

// TODO - replace with real API call of todos. For now, just returning GET/me data
export const getTodosApi = async (): Promise<UserType> => {
  const response = await apiClient.get<UserType>('/me')
  return response.data
}
