import apiClient from '@/_api/base'
import { HouseType } from '@/_types'

export const getHouseApi = async (houseId: number): Promise<HouseType> => {
  const response = await apiClient.get<HouseType>(`/houses/${houseId}`)
  return response.data
}
