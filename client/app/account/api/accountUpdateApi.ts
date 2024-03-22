import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { AccountSchema } from '../schema'

export const accountUpdateApi = async (data: AccountSchema) => {
  const response = await apiClient.put<Omit<UserType, 'houses'>>(
    '/account',
    data,
  )
  return response.data
}
