import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { LoginSchema } from '../schema'

type LoginResponse = Omit<UserType, 'houses'> & { accessToken: string }

export const loginApi = async (
  data: LoginSchema,
  invitedHouseId: string | null,
) => {
  const response = await apiClient.post<LoginResponse>(
    `/auth/login${invitedHouseId ? `?invited_house_id=${invitedHouseId}` : ''}`,
    data,
  )
  return response.data
}
