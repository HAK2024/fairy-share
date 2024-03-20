'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { FormContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { useGetHouseQuery } from '@/_hooks/api'
// import { HouseSettingForm } from '../components'

export default function HouseEditPage() {
  const router = useRouter()
  const { isAdmin } = useGetHouseInfo()
  const { data: house, isLoading } = useGetHouseQuery()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  return (
    <FormContainer>
      <Heading title='House Setting' />
      {/* {isLoading ? <Loading /> : <HouseSettingForm defaultData={house} />} */}
    </FormContainer>
  )
}
