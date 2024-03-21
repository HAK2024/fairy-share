import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useGetHouseInfo, useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useCreateTaskMutation } from './api'
import { createTaskResolver, taskSchema } from '../schema'

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { houseId } = useGetHouseInfo()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<taskSchema>({
    resolver: createTaskResolver,
    defaultValues: {
      title: '',
      date: undefined,
      assigneeId: undefined,
      note: '',
    },
  })

  const { mutate, isPending } = useCreateTaskMutation()

  const handleSuccess = () => {
    // TODO: Need to invalidate queryKey that is related to tasks
    toast({ variant: 'success', title: 'Successfully created a task!' })
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    form.reset()
    router.push('/tasks')
  }

  const handleError = (error: unknown) => {
    console.error(error)
    let message = 'Please try again later.'
    if (isErrorWithMessage(error) && error.response) {
      message = error.response.data.message
    }
    toast({
      variant: 'destructive',
      title: 'Failed to create a task..',
      description: message,
    })
  }

  const onCreateTask = (data: taskSchema) => {
    const updatedData = {
      ...data,
      houseId,
    }
    mutate(updatedData, { onSuccess: handleSuccess, onError: handleError })
  }

  return {
    form,
    onSubmit: form.handleSubmit(onCreateTask),
    isPending,
  }
}
