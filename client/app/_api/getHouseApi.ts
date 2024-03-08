import apiClient from '@/_api/base'
import { HouseType } from '@/_types'

export const getHouseApi = async (
  userId: number,
  houseId: number,
): Promise<HouseType> => {
  const response = await apiClient.get<HouseType>('/houses')
  return response.data
}
