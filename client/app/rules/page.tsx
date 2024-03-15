'use client'

import React from 'react'
import { Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { RuleList } from './component'

export default function Rules() {
  const { data: house, isLoading } = useGetHouseQuery()

  if (isLoading || !house) return <Loading />
  /* TODO: error handling */

  return (
    <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
      <Heading title={`${house.name}'s Rules`} />
      <RuleList rules={house.rules} />
    </div>
  )
}
