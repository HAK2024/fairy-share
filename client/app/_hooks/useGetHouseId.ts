import { useGetMeQuery } from '@/_hooks/api'

export const useGetHouseId = () => {
  const { data: me } = useGetMeQuery()

  const houseId = me?.houses && me.houses.length && me.houses[0].houseId

  return {
    houseId: Number(houseId),
  }
}
