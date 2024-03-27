'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { FormContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { useGetHouseQuery } from '@/_hooks/api'
import {
  HouseUpdateForm,
  DeleteHouse,
  MembersManagementModal,
} from '../components'

export default function HouseEditPage() {
  const router = useRouter()
  const { isAdmin } = useGetHouseInfo()
  const { data: house, isLoading } = useGetHouseQuery()
  const [isOpen, setIsOpen] = useState(false)

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
              setIsOpen(true)
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
      {isOpen && (
        <MembersManagementModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </FormContainer>
  )
}
