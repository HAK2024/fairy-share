import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { INVITED_HOUSE_ID } from '@/_consts'
import { useGetMeQuery } from './api'

export const useCheckInvitedHouse = (onOpen: () => void) => {
  const searchParams = useSearchParams()
  const invitedHouseId = searchParams.get(INVITED_HOUSE_ID)

  const { data: me } = useGetMeQuery()

  useEffect(() => {
    if (invitedHouseId && me?.houses.length) {
      if (me.houses[0].houseId !== Number(invitedHouseId)) {
        onOpen()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
