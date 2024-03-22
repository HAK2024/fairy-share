import { RuleType } from '@/_types'

export type HouseType = {
  houseId: number
  name: string
  isExpensePerTime: boolean
  isAdmin: boolean
  rules: RuleType[]
  houseMembers: { id: number; name: string }[]
}
