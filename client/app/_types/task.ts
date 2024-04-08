import { colorMap } from '@/_consts'

export type TaskType = {
  id: number
  title: string
  date: Date
  note: string
  houseId: number
  assigneeId: number
  isCompleted: boolean
}

export type TaskTypeWithUser = {
  id: number
  title: string
  date: Date
  note: string
  houseId: number
  assigneeId: number
  isCompleted: boolean
  user: TaskUserType
}

type IconType = keyof typeof colorMap

type TaskUserType = {
  id: number
  name: string
  icon: IconType
}
