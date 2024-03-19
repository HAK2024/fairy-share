import { customCreate } from './setting'

type AuthStore = {
  accessToken: null | string
  setAccessToken: (token: string | null) => void
  csrfToken: string | null
  setCsrfToken: (token: string | null) => void
}

export const useAuthStore = customCreate<AuthStore>()((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  csrfToken: null,
  setCsrfToken: (token) => set({ csrfToken: token }),
}))
