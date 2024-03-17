'use client'

import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Loading } from '@/_components/layout'
import { Header, Footer } from '@/_components/layout'
import {
  AUTH_PRIVATE_SETTING_PATH,
  AUTH_PUBLIC_PATH,
  INVITED_HOUSE_ID,
} from '@/_consts'
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
  const searchParams = useSearchParams()
  const invitedHouseId = searchParams.get(INVITED_HOUSE_ID)
  const setCsrfToken = useAuthStore((state) => state.setCsrfToken)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const accessToken = useAuthStore((state) => state.accessToken)

  const isAccessingAuthPage = AUTH_PUBLIC_PATH.includes(pathname)
  const isAccessingSettingPage = AUTH_PRIVATE_SETTING_PATH.includes(pathname)

  const { data: csrfTokenData } = useGetCsrfTokenQuery()

  const { data: meData } = useGetMeQuery()

  const { houseId } = useGetHouseId()

  const noUserHouseId = meData && !houseId

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
    if (!userToken && !accessToken && !isAccessingAuthPage) {
      router.push('/login')
    }

    if (noUserHouseId && !isAccessingAuthPage) {
      router.push(
        `/house/create${invitedHouseId ? `?${INVITED_HOUSE_ID}=${invitedHouseId}` : ''}`,
      )
    }
  }, [
    userToken,
    accessToken,
    router,
    isAccessingAuthPage,
    setAccessToken,
    noUserHouseId,
    invitedHouseId,
  ])

  useEffect(() => {
    // Redirect to home if the user has token when accessing auth pages.
    if (meData && isAccessingAuthPage) {
      router.push(
        `/${invitedHouseId ? `?${INVITED_HOUSE_ID}=${invitedHouseId}` : ''}`,
      )
    }
  }, [meData, isAccessingAuthPage, router, invitedHouseId])

  /*
   * 1. If the user is accessing auth pages and does not have token on cookie, show auth pages.
   * 2. If the user is accessing auth pages and has token on cookie, and has user Data, redirect to top page.
   * 3. If the user is accessing private pages and has token on cookie and has houseId, show private pages.
   * 4. If the user is accessing setting page and has token on cookie, show setting page.
   */
  const showPages =
    (isAccessingAuthPage && !userToken) ||
    (isAccessingAuthPage && userToken && (!!meData || accessToken)) ||
    (!isAccessingSettingPage && !!accessToken && !!houseId) ||
    (isAccessingSettingPage && !!accessToken)

  if (showPages) {
    return (
      <div
        className={`${meData ? 'min-h-svh-minus-24 mb-24 md:mb-0 md:min-h-svh' : 'min-h-svh'}`}
      >
        {!isAccessingAuthPage && <Header hasNavigation={!noUserHouseId} />}
        {children}
        {!isAccessingAuthPage && <Footer hasNavigation={!noUserHouseId} />}
      </div>
    )
  } else {
    return <Loading isCenter />
  }
}

export { CheckAuth }
