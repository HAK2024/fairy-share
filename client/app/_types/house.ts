import { IconType } from 'react-icons/lib'
import { RuleType, TaskType } from '@/_types'

export type HouseType = {
  houseId: number
  name: string
  isExpensePerTime: boolean
  currentUserIsAdmin: boolean
  rules: RuleType[]
  tasks: TaskType[]
  houseMembers: { id: number; name: string; isAdmin: boolean; icon: IconType }[]
}
