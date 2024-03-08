import { create } from 'zustand'
import { UserType } from '@/_types'

type AuthStore = {
  currentUser: UserType | null
  setCurrentUser: (user: UserType | null) => void
  csrfToken: string | null
  setCsrfToken: (token: string | null) => void
  getHouseId: () => number
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
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

    if (!houseId) throw new Error('error')

    return houseId
  },
}))
