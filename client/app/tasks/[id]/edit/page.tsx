'use client'

import { FormContainer, Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { EditTaskForm } from '@/tasks/components'
import { useGetTaskQuery } from '@/tasks/hooks/api'

export default function EditTask({ params }: { params: { id: string } }) {
  const taskId = Number(params.id)
  const { isLoading: isLoadingHouse } = useGetHouseQuery()
  const {
    data: task,
    isError: isTaskError,
    isLoading: isLoadingTask,
  } = useGetTaskQuery(taskId)

  // If the user tries to access to the url that has invalid taskId, show an error component
  // TODO: Replace this with the error component
  if (isTaskError) {
    return <p>Failed to load data.</p>
  }

  return (
    <FormContainer>
      <Heading title='Edit Task' />
      {isLoadingHouse || isLoadingTask || !task ? (
        <Loading />
      ) : (
        <EditTaskForm defaultData={task} />
      )}
    </FormContainer>
  )
}
