import Link from 'next/link'
import { BiEuro } from 'react-icons/bi'
import { BiHomeAlt2 } from 'react-icons/bi'
import { BiCalendarAlt } from 'react-icons/bi'

type FooterProps = {
  hasNavigation?: boolean
}

const Footer = ({ hasNavigation = true }: FooterProps) => {
  return (
    // Footer: Visible on devices less wider than "md" breakpoint and hasNavigation is true
    <footer
      className={`${hasNavigation ? 'fixed' : 'hidden'} bottom-0 left-0 right-0 z-30 flex h-16 w-screen items-center bg-teal-50 text-white shadow-lg md:hidden`}
    >
      <nav className='flex w-full items-center justify-between px-6'>
        <Link
          href={'/'}
          aria-label='Visit home page'
          className='flex items-center justify-center rounded-full text-primary transition-transform duration-300 hover:scale-110'
        >
          <BiHomeAlt2 className='h-7 w-7' />
        </Link>
        <Link
          href={'/tasks'}
          aria-label='Visit tasks page'
          className='relative flex -translate-y-8 items-center justify-center'
        >
          <BiCalendarAlt className='z-10 h-12 w-12 rounded-full bg-primary p-2 shadow-md shadow-primary transition-transform duration-300 hover:scale-110' />
          <span className='absolute inset-0 z-0 h-16 w-16 -translate-x-2 -translate-y-2 rounded-full bg-teal-50 '></span>
        </Link>
        <Link
          href={'/expenses'}
          aria-label='Visit expenses page'
          className='flex items-center justify-center transition-transform duration-300 hover:scale-110'
        >
          <BiEuro className='h-8 w-8 text-primary' />
        </Link>
      </nav>
    </footer>
  )
}

export { Footer }
