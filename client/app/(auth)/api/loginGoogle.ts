import apiClient from '@/_api/base'
import { UserType } from '@/_types'

export const loginGoogleApi = async (
  code: string,
  invitedHouseId: string | null,
) => {
  const response = await apiClient.post<Omit<UserType, 'houses'>>(
    `/auth/login/google${invitedHouseId ? `?invited_house_id=${invitedHouseId}` : ''}`,
    {
      code,
    },
  )
  return response.data
}
