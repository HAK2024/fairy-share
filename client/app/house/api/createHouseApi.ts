import apiClient from '@/_api/base'
import { HouseType } from '@/_types'
import { CreateHouseSchema } from '../schema'
import { HouseApiType } from '../type'

export const createHouseApi = async (data: HouseApiType<CreateHouseSchema>) => {
  const response = await apiClient.post<HouseType>('/houses', data)
  return response.data
}
