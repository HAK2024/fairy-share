'use client'

import Link from 'next/link'
import { PageContainer } from '@/_components/layout'
import { Button } from '@/_components/ui'

export default function NotFound() {
  return (
    <PageContainer className='flex flex-col items-center gap-4 pt-10 md:pt-20'>
      <h2 className='text-center text-2xl font-bold'>
        <span className='block md:inline'>Oops! </span>Page Not Found
      </h2>
      <p className='text-4xl font-semibold'>404</p>
      <p className='text-lg'>Sorry, we could not find the page..</p>

      <Button variant='outline' className='mt-8' asChild>
        <Link href='/'>Back to Top</Link>
      </Button>
    </PageContainer>
  )
}
