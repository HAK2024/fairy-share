import apiClient from '@/_api/base'
import { UserType } from '@/_types'
import { RegisterSchema } from '../schema'

type RegisterResponse = Omit<UserType, 'houses'> & { accessToken: string }

export const registerApi = async (
  data: RegisterSchema,
  invitedHouseId: string | null,
) => {
  const response = await apiClient.post<RegisterResponse>(
    `/auth/register${invitedHouseId ? `?invited_house_id=${invitedHouseId}` : ''}`,
    data,
  )
  return response.data
}
