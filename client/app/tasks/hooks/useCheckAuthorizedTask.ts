import { useEffect, useState } from 'react'
import { useGetMeQuery } from '@/_hooks/api'

const useCheckAuthorizedTask = (taskId: number) => {
  const { data: user, isLoading: isUserLoading } = useGetMeQuery()
  const tasks = user?.houses[0]?.tasks

  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isCheckingAuthorization, setIsCheckingAuthorization] = useState(true)

  useEffect(() => {
    if (!isUserLoading) {
      const taskExists = tasks?.some((task) => task.id === taskId) ?? false

      setIsAuthorized(taskExists)
      setIsCheckingAuthorization(false)
    }
  }, [taskId, tasks, isUserLoading])

  return { isAuthorized, isCheckingAuthorization }
}

export { useCheckAuthorizedTask }
