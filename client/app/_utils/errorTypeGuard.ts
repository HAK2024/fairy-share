import axios, { AxiosError } from 'axios'

type ServerMessage = {
  message: string
}

export const isErrorWithMessage = (
  error: unknown,
): error is AxiosError<ServerMessage> => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message !== undefined
  }

  return false
}
