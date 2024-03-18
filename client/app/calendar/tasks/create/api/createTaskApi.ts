import { apiClient } from '@/_api'
import { taskSchema } from '../../_schema'

export const createTaskApi = async (data: taskSchema) => {
  const response = await apiClient.post('/tasks/create', data)
  return response.data
}
