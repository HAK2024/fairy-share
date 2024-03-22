'use client'

import React from 'react'
import { Button } from '@/_components/ui'
import { useDeleteTask } from './hooks'

const TasksCalendar = () => {
  // TODO: This is just an example of how deleting a task works, so please change it
  const taskIds = [
    126 /* success if userId is 101 */, 10000 /* not found */,
    128 /* not permission */,
  ]
  const { onDeleteTask, isPending: isDeleting } = useDeleteTask()

  const handleDeleteTask = (taskId: number) => {
    onDeleteTask(taskId)
  }

  return (
    <div className='flex gap-3 p-10'>
      {taskIds.map((taskId) => (
        <Button
          key={taskId}
          variant={'destructive'}
          onClick={() => handleDeleteTask(taskId)}
          isLoading={isDeleting}
        >
          Delete taskId: {taskId}
        </Button>
      ))}
    </div>
  )
}

export default TasksCalendar
