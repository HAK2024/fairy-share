import { create } from 'zustand'
import { UserType } from '@/_types'

type AuthStore = {
  currentUser: UserType | null
  setCurrentUser: (user: UserType | null) => void
  csrfToken: string | null
  setCsrfToken: (token: string | null) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  csrfToken: null,
  setCsrfToken: (token) => set({ csrfToken: token }),
}))
