'use client'

import React from 'react'
import router from 'next/router'
import { FiPlus } from 'react-icons/fi'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { TasksCalendar } from './components'
// import { useDeleteTask } from './hooks'

const TasksCalendarPage = () => {
  const { houseName } = useGetHouseInfo()
  // TODO: This is just an example of how deleting a task works, so please change it
  // const taskIds = [
  //   126 /* success if userId is 101 */, 10000 /* not found */,
  //   128 /* not permission */,
  // ]
  // const { onDeleteTask, isPending: isDeleting } = useDeleteTask()

  // const handleDeleteTask = (taskId: number) => {
  //   onDeleteTask(taskId)
  // }

  return (
    <div className='flex flex-col gap-8 px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
      <Heading
        title={houseName}
        buttonComponent={
          <Button
            variant={'outline'}
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
