import React from 'react'
import { cn } from '@/_utils'

type PageContainerProps = {
  className?: string
  children: React.ReactNode
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div
      className={cn('px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10', className)}
    >
      {children}
    </div>
  )
}

export { PageContainer }
