import apiClient from '@/_api/base'
import { HouseType } from '@/_types'
import { UpdateHouseSchema } from '../schema'
import { HouseApiType } from '../type'

export const updateHouseApi = async (
  data: HouseApiType<UpdateHouseSchema>,
  houseId: number,
) => {
  const response = await apiClient.put<HouseType>(`/houses/${houseId}`, data)
  return response.data
}
