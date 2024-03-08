import { RuleType } from '@/_types'

export type HouseType = {
  houseId: number
  name: string
  isExpensePerTime: boolean
  isAdmin: boolean // it's not in schema
  rules: RuleType[]
}
