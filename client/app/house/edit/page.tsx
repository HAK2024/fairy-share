'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { FormContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { useGetHouseQuery, useGetMeQuery } from '@/_hooks/api'
import { HouseUpdateForm, DeleteHouse, MembersManagement } from '../components'

export default function HouseEditPage() {
  const router = useRouter()
  const { isAdmin } = useGetHouseInfo()
  const { data: house, isLoading } = useGetHouseQuery()
  const userId = useGetMeQuery()?.data?.id
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  if (isLoading || !house || !userId) {
    return <Loading />
  }

  return (
    <FormContainer>
      <Heading
        title='House Setting'
        buttonComponent={
          <Button
            variant={'outline'}
            onClick={() => {
              setIsOpenModal(true)
            }}
          >
            Members
          </Button>
        }
      />
      <HouseUpdateForm defaultData={house} />
      <div className='mt-14'>
        <DeleteHouse houseId={house.houseId} />
      </div>
      <MembersManagement
        userId={userId}
        house={house}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </FormContainer>
  )
}
