import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { TaskType } from '@/_types'
import { isErrorWithMessage } from '@/_utils'
import { useUpdateTaskMutation } from './api'
import { taskResolver, taskSchema } from '../schema'

export const useUpdateTask = (defaultData: TaskType) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const { mutate, isPending } = useUpdateTaskMutation()

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
    toast({ variant: 'success', title: 'Successfully updated a task!' })
    queryClient.invalidateQueries({
      queryKey: ['tasks', { id: defaultData.id }],
    })
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
      title: 'Failed to update a task..',
      description: message,
    })
  }

  const onUpdateTask = (data: taskSchema) => {
    mutate(
      { taskId: defaultData.id, data },
      { onSuccess: handleSuccess, onError: handleError },
    )
  }

  return {
    form,
    onSubmit: form.handleSubmit(onUpdateTask),
    isPending,
  }
}
