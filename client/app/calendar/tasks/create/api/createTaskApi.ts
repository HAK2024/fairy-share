import { apiClient } from '@/_api'
import { createTaskSchema } from '../schema'

export const createTaskApi = async (data: createTaskSchema) => {
  const response = await apiClient.post('/tasks/create', data)
  return response.data
}
