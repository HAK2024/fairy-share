import { apiClient } from '@/_api'

export const getTaskApi = async (taskId: number) => {
  const response = await apiClient.get(`/tasks/${taskId}`)
  return response.data
}
