'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { INVITED_HOUSE_ID } from '@/_consts'
import { useGetHouseId } from '@/_hooks'
import { useCreateUserHouseMutation } from '@/_hooks/api'

export default function HouseCreatePage() {
  const searchParams = useSearchParams()
  const invitedHouseId = searchParams.get(INVITED_HOUSE_ID)

  const router = useRouter()

  const hasMutated = useRef(false)

  const { houseId } = useGetHouseId()
  const { mutate, isPending } = useCreateUserHouseMutation()

  useEffect(() => {
    if (houseId) {
      router.push('/')
    }

    // If user had invitedHouse Id then create user house before showing house setting page
    if (invitedHouseId && !houseId && !hasMutated.current) {
      hasMutated.current = true
      mutate(invitedHouseId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseId, invitedHouseId])

  if (invitedHouseId || isPending) {
    return <Loading />
  }

  return (
    <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
      <Heading title='House Setting' />

      <div>House Create Page!</div>
    </div>
  )
}
