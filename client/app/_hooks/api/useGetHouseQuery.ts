import { useQuery } from '@tanstack/react-query'
import { getHouseApi } from '@/_api'
import { HouseType } from '@/_types'

export const useGetHouseQuery = (userId: number, houseId: number) => {
  const getHouse = async () => {
    const response = await getHouseApi(userId, houseId)
    return response
  }
  // not sure if this is corrected?
  const { data, isLoading, isError } = useQuery<HouseType>({
    queryKey: ['house'],
    queryFn: getHouse,
    retry: false,
  })
  return {
    data,
    isLoading,
    isError,
  }
}
