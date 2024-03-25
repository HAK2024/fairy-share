import apiClient from '@/_api/base'
import { UserHouse } from '@/_types'

export const createUserHouseApi = async (
  houseId: string,
): Promise<UserHouse> => {
  return apiClient
    .post<UserHouse>('/user-houses', {
      houseId,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}
