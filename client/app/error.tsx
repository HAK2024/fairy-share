'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AxiosError } from 'axios'
import { PageContainer } from '@/_components/layout'
import { Button } from '@/_components/ui'
import { isErrorWithMessage } from '@/_utils'

// NOTE: This component is for fallback component will be rendered within the root layout
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('error:', error)
  }, [error])

  let errorStatus = 404
  let errorMessage = 'Please try again later.'

  if (isErrorWithMessage(error) && error.response) {
    errorMessage = error.response.data.message
  }

  if (error instanceof AxiosError) {
    errorStatus = error.response?.status || errorStatus
  }

  return (
    <PageContainer className=' flex flex-col items-center gap-4 pt-10 md:pt-20'>
      <h2 className='text-center text-2xl font-bold'>
        <span className='block md:inline'>Oops! </span>Something went wrong...
      </h2>
      <p className='text-4xl font-semibold'>{errorStatus}</p>
      <p className='text-lg'>{errorMessage}</p>

      <Button variant='outline' className='mt-8' asChild>
        <Link href='/'>Back to Top</Link>
      </Button>
    </PageContainer>
  )
}
