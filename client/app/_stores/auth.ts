import { UserType } from '@/_types'
import { customCreate } from './setting'

type AuthStore = {
  currentUser: UserType | null
  setCurrentUser: (user: UserType | null) => void
  csrfToken: string | null
  setCsrfToken: (token: string | null) => void
}

export const useAuthStore = customCreate<AuthStore>()((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  csrfToken: null,
  setCsrfToken: (token) => set({ csrfToken: token }),
}))
