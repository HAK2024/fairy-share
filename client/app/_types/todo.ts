import { TaskType } from '.'

export type TodoType = {
  houseName: string
  todayTasks: TaskType[]
  weekTasks: TaskType[]
  hasUnpaidPayments: boolean
}
