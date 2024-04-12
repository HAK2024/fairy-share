import Link from 'next/link'
import { cn } from '@/_utils'

type RouterLinkProps = {
  children: string
  href: string
  className?: string
}
const RouterLink = ({ children, href, className }: RouterLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'font-semibold text-teal-800 hover:underline hover:underline-offset-4',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export { RouterLink }
