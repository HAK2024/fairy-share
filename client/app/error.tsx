'use client'

import { useEffect } from 'react'
import router from 'next/router'
import { AxiosError } from 'axios'
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

  // console.log('error!!!')

  let errorStatus = 404
  let errorMessage = 'Please try again later.'

  if (isErrorWithMessage(error) && error.response) {
    errorMessage = error.response.data.message
  }

  if (error instanceof AxiosError) {
    errorStatus = error.response?.status || errorStatus
  }

  return (
    <div className='mt-20 flex flex-col items-center gap-4 px-4'>
      <h2 className='text-center text-2xl font-bold'>
        <span className='block md:inline'>Oops! </span>Something went wrong...
      </h2>
      <p className='text-4xl font-semibold'>{errorStatus}</p>
      <p className='text-lg'>{errorMessage}</p>

      <Button
        variant='outline'
        className='mt-8'
        onClick={() => router.push('/')}
      >
        Back to Top
      </Button>
    </div>
  )
}
