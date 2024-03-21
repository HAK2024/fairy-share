import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { TaskType } from '@/_types'
import { isErrorWithMessage } from '@/_utils'
import { useEditTaskMutation } from './api'
import { taskResolver, taskSchema } from '../schema'

export const useEditTask = (defaultData: TaskType) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const { mutate, isPending } = useEditTaskMutation()

  const form = useForm<taskSchema>({
    resolver: taskResolver,
    defaultValues: {
      title: defaultData.title,
      date: new Date(defaultData.date),
      assigneeId: defaultData.assigneeId,
      note: defaultData.note,
    },
  })

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
    mutate(
      { taskId: defaultData.id, data },
      { onSuccess: handleSuccess, onError: handleError },
    )
  }

  return {
    form,
    onSubmit: form.handleSubmit(onEditTask),
    isPending,
  }
}
