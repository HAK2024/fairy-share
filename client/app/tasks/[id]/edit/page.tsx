'use client'

import { FormContainer, Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { EditTaskForm } from '@/tasks/components'
import { useGetTaskQuery } from '@/tasks/hooks/api'

export default function EditTask({ params }: { params: { id: string } }) {
  const { isLoading: isLoadingHouse } = useGetHouseQuery()
  const taskId = Number(params.id)
  const { isError, isLoading: isLoadingTask } = useGetTaskQuery(taskId)

  // If users try to access to the url that has invalid taskId, show an error component
  // TODO: Replace this with the error component
  if (isError) {
    return <p>Failed to load data.</p>
  }

  return (
    <FormContainer>
      <Heading title='Edit Task' />
      {isLoadingHouse || isLoadingTask ? (
        <Loading />
      ) : (
        <EditTaskForm taskId={taskId} />
      )}
    </FormContainer>
  )
}
