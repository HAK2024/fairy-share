import { iconColor } from '@/_consts'
import { HouseType } from '@/_types'

type IconType = (typeof iconColor)[number]['value']

export type UserType = {
  id: number
  name: string
  email: string
  icon: IconType
  houses: HouseType[]
}
