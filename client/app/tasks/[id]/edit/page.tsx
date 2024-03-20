'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormContainer, Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { EditTaskForm } from '@/tasks/components'
import { useCheckAuthorizedTask } from '@/tasks/hooks'
import { useGetTaskQuery } from '@/tasks/hooks/api'

export default function EditTask({ params }: { params: { id: string } }) {
  const taskId = Number(params.id)
  const router = useRouter()

  const { isLoading: isLoadingHouse } = useGetHouseQuery()
  const { isError: isTaskError, isLoading: isLoadingTask } =
    useGetTaskQuery(taskId)
  const { isAuthorized, isCheckingAuthorization } =
    useCheckAuthorizedTask(taskId)

  // If the user tries to access to the url that does not belong to the user house, redirect to the previous route
  useEffect(() => {
    if (!isCheckingAuthorization && !isAuthorized) {
      router.back()
    }
  }, [isAuthorized, isCheckingAuthorization, router])

  if (isLoadingHouse || isLoadingTask || isCheckingAuthorization) {
    return <Loading />
  }

  // If the user tries to access to the url that has invalid taskId, show an error component
  // TODO: Replace this with the error component
  if (isTaskError) {
    return <p>Failed to load data.</p>
  }

  return (
    <FormContainer>
      <Heading title='Edit Task' />
      <EditTaskForm taskId={taskId} />
    </FormContainer>
  )
}
