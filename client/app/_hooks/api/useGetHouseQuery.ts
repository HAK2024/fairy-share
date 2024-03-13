import { useQuery } from '@tanstack/react-query'
import { getHouseApi } from '@/_api'
import { useAuthStore } from '@/_stores'
import { HouseType } from '@/_types'

export const useGetHouseQuery = () => {
  const getHouseId = useAuthStore((state) => state.getHouseId)
  const houseId = getHouseId()

  const getHouse = async () => {
    const response = await getHouseApi(houseId)
    return response
  }

  const { data, isLoading, isError } = useQuery<HouseType>({
    queryKey: ['house'],
    queryFn: getHouse,
  })

  return {
    data,
    isLoading,
    isError,
  }
}
