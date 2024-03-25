'use client'

import Link from 'next/link'
import { Button } from '@/_components/ui'

export default function NotFound() {
  return (
    <div className='mt-20 flex flex-col items-center gap-4 px-4'>
      <h2 className='text-center text-2xl font-bold'>
        <span className='block md:inline'>Oops! </span>Page Not Found
      </h2>
      <p className='text-4xl font-semibold'>404</p>
      <p className='text-lg'>Sorry, we could not find the page..</p>

      <Button variant='outline' className='mt-8' asChild>
        <Link href='/'>Back to Top</Link>
      </Button>
    </div>
  )
}
