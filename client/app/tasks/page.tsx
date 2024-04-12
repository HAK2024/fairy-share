'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus } from 'react-icons/fi'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { TasksCalendar } from './components'

const TasksCalendarPage = () => {
  const router = useRouter()
  const { houseName } = useGetHouseInfo()

  return (
    <div className='flex flex-col gap-8 px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
      <Heading
        title={houseName}
        buttonComponent={
          <Button
            variant={'outline'}
            className='text-base'
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
    </div>
  )
}

export default TasksCalendarPage
