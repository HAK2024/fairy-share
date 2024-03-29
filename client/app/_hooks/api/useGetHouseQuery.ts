import { useQuery } from '@tanstack/react-query'
import { getHouseApi } from '@/_api'
import { HouseType } from '@/_types'
import { useGetHouseInfo } from '..'

export const useGetHouseQuery = () => {
  const { houseId } = useGetHouseInfo()

  const getHouse = async () => {
    const response = await getHouseApi(houseId)
    return response
  }

  const { data, isLoading, isError } = useQuery<HouseType>({
    queryKey: ['house'],
    queryFn: getHouse,
    throwOnError: true,
    enabled: !!houseId,
  })

  return {
    data,
    isLoading,
    isError,
  }
}
