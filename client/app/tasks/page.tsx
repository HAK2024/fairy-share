'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus } from 'react-icons/fi'
import { PageContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { TasksCalendar } from './components'

const TasksCalendarPage = () => {
  const router = useRouter()
  const { houseName } = useGetHouseInfo()

  return (
    <PageContainer className='flex flex-col gap-8'>
      <Heading
        title={houseName}
        buttonComponent={
          <Button
            variant={'outline'}
            className='text-base md:text-lg'
            onClick={() => router.push('/tasks/create')}
          >
            <span className='mr-1'>
              <FiPlus />
            </span>
            Add
          </Button>
        }
      />

      <TasksCalendar />
    </PageContainer>
  )
}

export default TasksCalendarPage
