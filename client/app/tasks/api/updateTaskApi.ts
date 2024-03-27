import { apiClient } from '@/_api'
import { taskSchema } from '../schema'

export const updateTaskApi = async (taskId: number, data: taskSchema) => {
  const response = await apiClient.put(`/tasks/${taskId}`, data)
  return response.data
}
