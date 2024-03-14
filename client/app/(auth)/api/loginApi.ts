import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { LoginSchema } from '../schema'

export const loginApi = async (
  data: LoginSchema,
  invitedHouseId: string | null,
) => {
  const response = await apiClient.post<Omit<UserType, 'houses'>>(
    `/auth/login${invitedHouseId && `?invited_house_id=${invitedHouseId}`}`,
    data,
  )
  return response.data
}
