import { useGetMeQuery } from '@/_hooks/api'

export const useGetHouseInfo = () => {
  const { data: me } = useGetMeQuery()

  const houseId = me?.houses && me.houses.length && me.houses[0].houseId
  const isAdmin = me?.houses && !!me.houses.length && me.houses[0].isAdmin

  return {
    houseId: Number(houseId),
    isAdmin: Boolean(isAdmin),
  }
}
