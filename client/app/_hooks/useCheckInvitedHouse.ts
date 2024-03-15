import { useSearchParams } from 'next/navigation'
import { INVITED_HOUSE_ID } from '@/_consts'
import { useGetMeQuery } from './api'

export const useCheckInvitedHouse = () => {
  const searchParams = useSearchParams()
  const invitedHouseId = searchParams.get(INVITED_HOUSE_ID)

  const { data: me } = useGetMeQuery()

  if (invitedHouseId) {
    if (me?.houses && me.houses[0].houseId !== Number(invitedHouseId)) {
      console.log('show Modal!')
    }
  }
}
