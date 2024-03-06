import Link from 'next/link'

type RouterLinkProps = {
  children: string
  href: string
  className?: string
}
const RouterLink = ({ children, href, className }: RouterLinkProps) => {
  return (
    <Link
      href={href}
      className={`font-semibold text-teal-800 hover:underline hover:underline-offset-4 ${className}`}
    >
      {children}
    </Link>
  )
}

export { RouterLink }
