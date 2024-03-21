'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiTrash } from 'react-icons/fi'
import { Loading } from '@/_components/layout'
import { FormContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { useGetHouseQuery } from '@/_hooks/api'
import { HouseUpdateForm } from '../components'

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
      <Heading
        title='House Setting'
        buttonComponent={
          // TODO: Open Modal for management members
          <Button variant={'outline'} onClick={() => {}}>
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
            {/* TODO: Delete house */}
            <Button
              variant={'destructiveOutline'}
              size='sm'
              className='flex gap-1'
            >
              <FiTrash />
              Delete House
            </Button>
          </div>
        </>
      )}
    </FormContainer>
  )
}
