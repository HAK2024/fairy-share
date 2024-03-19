'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { FormContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { INVITED_HOUSE_ID } from '@/_consts'
import { useGetHouseId } from '@/_hooks'
import { useCreateUserHouseMutation } from '@/_hooks/api'
import { HouseCreateForm } from '../components'

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
    <FormContainer>
      <Heading title='House Setting' />
      <HouseCreateForm />
    </FormContainer>
  )
}
