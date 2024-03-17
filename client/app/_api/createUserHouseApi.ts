import apiClient from '@/_api/base'
import { UserHouse } from '@/_types'

export const createUserHouseApi = async (
  houseId: string,
): Promise<UserHouse> => {
  const response = await apiClient.post<UserHouse>(
    `/houses/${houseId}/add-user`,
  )
  return response.data
}
