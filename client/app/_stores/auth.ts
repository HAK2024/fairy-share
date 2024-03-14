import { customCreate } from './setting'
import { UserType } from '../_types'

type AuthStore = {
  currentUser: UserType | null
  setCurrentUser: (user: UserType | null) => void
  csrfToken: string | null
  setCsrfToken: (token: string | null) => void
  getHouseId: () => number | null
}

export const useAuthStore = customCreate<AuthStore>()((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  csrfToken: null,
  setCsrfToken: (token) => set({ csrfToken: token }),
  getHouseId: () => {
    const currentUser = get().currentUser
    const houseId =
      currentUser?.houses &&
      currentUser.houses.length &&
      currentUser.houses[0].houseId

    return houseId || null
  },
}))
