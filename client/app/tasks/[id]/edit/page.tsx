'use client'

import { FormContainer, Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { EditTaskForm } from '@/tasks/components'
import { useGetTaskQuery } from '@/tasks/hooks/api'

export default function EditTask({ params }: { params: { id: string } }) {
  const taskId = Number(params.id)
  const { isLoading: isLoadingHouse } = useGetHouseQuery()
  const { data: task, isLoading: isLoadingTask } = useGetTaskQuery(taskId)

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
