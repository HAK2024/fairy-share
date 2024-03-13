import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/_stores'
import { updateTaskStatusApi } from './api'

export const useUpdateStatusMutation = () => {
  const queryClient = useQueryClient()
  const getHouseId = useAuthStore((state) => state.getHouseId)
  const houseId = getHouseId()

  const { mutate } = useMutation({
    mutationFn: updateTaskStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', houseId] })
    },
    onError: (error) => {
      console.error('Update failed', error)
    },
  })

  return { mutate }
}
