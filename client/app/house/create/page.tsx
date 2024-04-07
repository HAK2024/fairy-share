'use client'

import { Loading } from '@/_components/layout'
import { FormContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { HouseCreateForm } from '../components'
import { useCreateUserHouseOnMount } from '../hooks'

export default function HouseCreatePage() {
  const { isLoading, invitedHouseId } = useCreateUserHouseOnMount()

  if (invitedHouseId && isLoading) {
    return <Loading />
  }

  return (
    <FormContainer>
      <Heading title='House Settings' />
      <HouseCreateForm />
    </FormContainer>
  )
}
