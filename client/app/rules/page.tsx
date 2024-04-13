'use client'

import React from 'react'
import { Loading, PageContainer } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { RuleList } from './component'

export default function Rules() {
  const { data: house, isLoading } = useGetHouseQuery()

  if (isLoading || !house) return <Loading />

  return (
    <PageContainer>
      <Heading title={`${house.name}'s Rules`} />
      <RuleList rules={house.rules} />
    </PageContainer>
  )
}
