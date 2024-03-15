'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { Header, Footer } from '@/_components/layout'
import { AUTH_PUBLIC_PATH } from '@/_consts'
import { useGetHouseId } from '@/_hooks'
import { useGetMeQuery, useGetCsrfTokenQuery } from '@/_hooks/api'
import { useAuthStore } from '@/_stores'

const CheckAuth = ({
  children,
  userToken,
}: {
  children: React.ReactNode
  userToken?: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const setCsrfToken = useAuthStore((state) => state.setCsrfToken)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const accessToken = useAuthStore((state) => state.accessToken)

  const isAccessingAuthPages = AUTH_PUBLIC_PATH.includes(pathname)

  const { data: csrfTokenData } = useGetCsrfTokenQuery()

  const { data: meData } = useGetMeQuery()

  const { houseId } = useGetHouseId()

  useEffect(() => {
    if (csrfTokenData) {
      setCsrfToken(csrfTokenData.csrfToken)
    }
  }, [csrfTokenData, setCsrfToken])

  useEffect(() => {
    if (userToken) {
      setAccessToken(userToken)
    }
    // Redirect to login if the user doesn't have token when accessing private pages.

    if (!userToken && !accessToken && !isAccessingAuthPages) {
      router.push('/login')
    }
  }, [userToken, accessToken, router, isAccessingAuthPages, setAccessToken])

  useEffect(() => {
    // Redirect to home if the user has token when accessing auth pages.
    if (meData && isAccessingAuthPages) {
      router.push('/')
    }
  }, [meData, isAccessingAuthPages, router])

  /*
   * 1. If the user is accessing auth pages and does not have token on cookie, show auth pages.
   * 2. If the user is accessing auth pages and has token on cookie, and has user Data, redirect to top page.
   * 3. If the user is accessing private pages and has token on cookie and has houseId, show private pages.
   */
  const showPages =
    (isAccessingAuthPages && !userToken) ||
    (isAccessingAuthPages && userToken && (!!meData || accessToken)) ||
    (!!houseId && !!accessToken)

  const noUserHouseId = meData && !houseId

  if (showPages) {
    return (
      <>
        {noUserHouseId ? (
          <div className='min-h-svh'>
            <Header hasNavigation={false} />
            <div>House Setting form</div>
            <Footer hasNavigation={false} />
          </div>
        ) : (
          <div
            className={`${meData ? 'min-h-svh-minus-24 mb-24 md:mb-0 md:min-h-svh' : 'min-h-svh'}`}
          >
            {!isAccessingAuthPages && <Header />}
            {children}
            {!isAccessingAuthPages && <Footer />}
          </div>
        )}
      </>
    )
  } else {
    return <Loading isCenter />
  }
}

export { CheckAuth }
