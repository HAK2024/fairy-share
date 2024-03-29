import { apiClient } from '@/_api'
import { taskSchema } from '../schema'

export const createTaskApi = async (data: taskSchema) => {
  const response = await apiClient.post('/tasks', data)
  return response.data
}
