import { apiClient } from '@/_api'

export const deleteTaskApi = async (taskId: number) => {
  const response = await apiClient.delete(`/tasks/${taskId}`)
  return response.data
}
