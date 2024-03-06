import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  // const accessToken = getAccessToken()
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`
  // }

  return config
})

export default apiClient
