import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useEditTaskMutation, useGetTaskQuery } from './api'
import { taskResolver, taskSchema } from '../schema'

export const useEditTask = (taskId: number) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const { data: task } = useGetTaskQuery(taskId)

  const form = useForm<taskSchema>({
    resolver: taskResolver,
    defaultValues: {
      title: task?.title || '',
      date: task ? new Date(task.date) : null,
      assigneeId: task?.assigneeId || null,
      note: task?.note || '',
    },
  })

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        date: new Date(task.date),
        assigneeId: task.assigneeId,
        note: task.note,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task])

  const handleSuccess = () => {
    toast({ variant: 'success', title: 'Successfully edited a task!' })
    queryClient.invalidateQueries({
      queryKey: ['todos', 'me', 'house', 'tasks'],
    })
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
      title: 'Failed to edit a task..',
      description: message,
    })
  }

  const onEditTask = (data: taskSchema) => {
    mutate({ taskId, data }, { onSuccess: handleSuccess, onError: handleError })
  }

  const { mutate, isPending } = useEditTaskMutation()

  return {
    form,
    onSubmit: form.handleSubmit(onEditTask),
    isPending,
  }
}
