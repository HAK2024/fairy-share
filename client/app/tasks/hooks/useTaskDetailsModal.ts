import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TaskTypeWithUser } from '@/_types'
import { CustomEventType } from '../types'

export const useTaskDetailsModal = (tasks: TaskTypeWithUser[] | undefined) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const taskId = searchParams.get('taskId')

  const [selectedTask, setSelectedTask] = useState<TaskTypeWithUser | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (taskId) {
      const task = tasks?.find((task) => task.id === Number(taskId))
      if (task) {
        setSelectedTask(task)
        setIsModalOpen(true)
      }
    }
  }, [tasks, taskId])

  const onModalClose = () => {
    if (taskId) {
      router.replace('/tasks', { scroll: false })
    }
    setIsModalOpen(false)
  }

  const onModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleSelectEvent = (event: CustomEventType) => {
    setSelectedTask({
      id: event.id,
      title: event.title,
      date: event.date,
      note: event.note,
      houseId: event.houseId,
      assigneeId: event.assigneeId,
      isCompleted: event.isCompleted,
      user: event.user,
    })
    onModalOpen()
  }

  return {
    selectedTask,
    isModalOpen,
    onModalClose,
    onModalOpen,
    handleSelectEvent,
  }
}
