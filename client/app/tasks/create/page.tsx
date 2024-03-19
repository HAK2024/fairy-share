'use client'

import { FormContainer, Loading } from '@/_components/layout'
import { Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { CreateTaskForm } from '../components'

export default function CreateTask() {
  const { isLoading } = useGetHouseQuery()

  return (
    <FormContainer>
      <Heading title='Create Task' />
      {isLoading ? <Loading /> : <CreateTaskForm />}
    </FormContainer>
  )
}
