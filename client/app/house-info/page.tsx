'use client'

import React from 'react'
import { Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { HouseInfoList } from './component'

export default function HouseInfoPage() {
  const { data: house, isLoading } = useGetHouseQuery()

  if (isLoading || !house) return <Loading />

  return (
    <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
      <Heading title={`${house.name}'s House Info`} />
      <HouseInfoList rules={house.rules} members={house.houseMembers} />
    </div>
  )
}
