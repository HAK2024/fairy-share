'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { FormContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { useGetHouseQuery } from '@/_hooks/api'
import { HouseUpdateForm, DeleteHouse, MembersManagement } from '../components'

export default function HouseEditPage() {
  const router = useRouter()
  const { isAdmin } = useGetHouseInfo()
  const { data: house, isLoading } = useGetHouseQuery()
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  return (
    <FormContainer>
      <Heading
        title='House Setting'
        buttonComponent={
          // TODO: Open Modal for management members
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
      {isLoading || !house ? (
        <Loading />
      ) : (
        <>
          <HouseUpdateForm defaultData={house} />
          <div className='mt-14'>
            <DeleteHouse houseId={house.houseId} />
          </div>
        </>
      )}

      <MembersManagement
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </FormContainer>
  )
}
