import apiClient from '@/_api/base'
import { HouseType } from '@/_types'
import { CreateHouseSchema } from '../schema'

export const createHouseApi = async (data: CreateHouseSchema) => {
  const response = await apiClient.post<HouseType>('/houses', data)
  return response.data
}
