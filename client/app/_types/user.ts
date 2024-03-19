import { colorMap } from '@/_consts'
import { HouseType } from '@/_types'

type IconType = keyof typeof colorMap

export type UserType = {
  id: number
  name: string
  email: string
  icon: IconType
  houses: HouseType[]
}
