import { apiClient } from '@/_api'
import { TaskTypeWithUser } from '@/_types'

export const getTasksApi = async () => {
  const response = await apiClient.get<TaskTypeWithUser[]>('/tasks')
  return response.data
}
