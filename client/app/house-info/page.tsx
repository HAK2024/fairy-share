'use client'

import React from 'react'
import { Loading, PageContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { HouseInfoList } from './component'

export default function HouseInfoPage() {
  const { data: house, isLoading } = useGetHouseQuery()

  if (isLoading || !house) return <Loading />

  return (
    <PageContainer>
      <Heading title={`${house.name}'s House Info`} />
      <HouseInfoList rules={house.rules} members={house.houseMembers} />
    </PageContainer>
  )
}
