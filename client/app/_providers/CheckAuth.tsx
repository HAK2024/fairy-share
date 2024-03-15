'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { Header, Footer } from '@/_components/layout'
import { AUTH_PUBLIC_PATH } from '@/_consts'
import { useGetMeQuery, useGetCsrfTokenQuery } from '@/_hooks/api'
import { useAuthStore } from '@/_stores'

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const csrfToken = useAuthStore((state) => state.csrfToken)
  const setCsrfToken = useAuthStore((state) => state.setCsrfToken)
  const currentUser = useAuthStore((state) => state.currentUser)
  const getHouseId = useAuthStore((state) => state.getHouseId)
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)

  const isAccessingAuthPages = AUTH_PUBLIC_PATH.includes(pathname)

  const { data: csrfTokenData } = useGetCsrfTokenQuery()

  const {
    data: meData,
    isLoading: isMeLoading,
    isError: isMeError,
  } = useGetMeQuery(!!csrfToken)

  useEffect(() => {
    if (csrfTokenData) {
      setCsrfToken(csrfTokenData.csrfToken)
    }
  }, [csrfTokenData, setCsrfToken])

  useEffect(() => {
    // Redirect to login if the user doesn't have token when accessing private pages.
    if (isMeError && !isAccessingAuthPages) {
      router.push('/login')
    }

    // Redirect to home if the user has token when accessing auth pages.
    if (currentUser && isAccessingAuthPages) {
      router.push('/')
    }

    if (meData) {
      return setCurrentUser(meData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData, isMeLoading, isMeError, router, currentUser, setCurrentUser])

  // Show LoadingUI until finish checking if the user has token when accessing auth pages.
  if (isAccessingAuthPages && (!isMeError || isMeLoading)) {
    return <Loading isCenter />
  }

  // Show LoadingUI until finish checking if the user has token when accessing private pages.
  if (!currentUser && !isAccessingAuthPages) {
    return <Loading isCenter />
  }

  // Redirect to house setting page if the user doesn't create any house yet.
  if (currentUser && !getHouseId()) {
    return (
      <>
        <Header hasNavigation={false} />
        <div>House Setting form</div>
        <Footer hasNavigation={false} />
      </>
    )
  }

  return (
    <div
      className={`${currentUser ? 'min-h-svh-minus-24 mb-24 md:mb-0 md:min-h-svh' : 'min-h-svh'}`}
    >
      {currentUser && <Header />}
      {children}
      {currentUser && <Footer />}
    </div>
  )
}

export { CheckAuth }
