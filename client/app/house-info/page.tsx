'use client'

import React from 'react'
import { Loading, PageContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'
import { HouseInfoList, LeaveHouse } from './component'

export default function HouseInfoPage() {
  const { data: user, isLoading } = useGetMeQuery()

  if (isLoading || !user) return <Loading />

  const userHouse = user.houses

  return (
    <PageContainer>
      <Heading title={`${userHouse[0].name}'s House Info`} />
      <HouseInfoList
        rules={userHouse[0].rules}
        members={userHouse[0].houseMembers}
      />
      {userHouse.length > 0 && (
        <div className='mt-6 md:mt-8'>
          <LeaveHouse userHouse={userHouse[0]} userId={user.id} />
        </div>
      )}
    </PageContainer>
  )
}
