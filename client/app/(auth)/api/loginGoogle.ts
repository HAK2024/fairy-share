import apiClient from '@/_api/base'
import { UserType } from '@/_types'

type LoginResponse = Omit<UserType, 'houses'> & { accessToken: string }

export const loginGoogleApi = async (
  code: string,
  invitedHouseId: string | null,
) => {
  const response = await apiClient.post<LoginResponse>(
    `/auth/login/google${invitedHouseId ? `?invited_house_id=${invitedHouseId}` : ''}`,
    {
      code,
    },
  )
  return response.data
}
