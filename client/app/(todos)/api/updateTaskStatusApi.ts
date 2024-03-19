import { apiClient } from '@/_api'

export const updateTaskStatusApi = async ({
  taskId,
  isCompleted,
}: {
  taskId: number
  isCompleted: boolean
}) => {
  const response = await apiClient
    .put(`/tasks/${taskId}/status`, {
      isCompleted,
    })
    .then((res) => res.data)

  return response
}
