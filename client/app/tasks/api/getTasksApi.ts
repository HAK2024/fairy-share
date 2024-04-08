import { apiClient } from '@/_api'
import { TaskTypeWithUser } from '@/_types'

export const getTasksApi = async (year: number, month: number) => {
  const response = await apiClient.get<TaskTypeWithUser[]>(
    `/tasks?year=${year}&month=${month}`,
  )
  return response.data
}
