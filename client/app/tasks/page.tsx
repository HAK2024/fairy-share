'use client'

import React from 'react'
import { RouterLink } from '@/_components/ui'

const TasksCalendar = () => {
  // TODO: This is just for a test to see if when you create or update a task, it properly invalidates the cache, so I'll delete it after it's approved
  return (
    <div>
      <RouterLink href='tasks/127/edit'>edit task</RouterLink>
      <RouterLink href='tasks/create'>create task</RouterLink>
    </div>
  )
}

export default TasksCalendar
