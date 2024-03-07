import axios from 'axios'
import { useAuthStore } from '@/_store'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const csrfToken = useAuthStore.getState().csrfToken

  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken
  }

  return config
})

export default apiClient
