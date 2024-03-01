import Link from 'next/link'
import { RiCalendarFill } from 'react-icons/ri'
import { RiHomeFill } from 'react-icons/ri'
import { RiMoneyEuroCircleFill } from 'react-icons/ri'

// TODO: This design may have some room for improvement
const Footer = () => {
  return (
    // Footer: Visible on devices less wider than "md" breakpoint
    <div className='fixed bottom-0 left-0 right-0 flex h-16 w-screen items-center bg-teal-50 text-white shadow-lg md:hidden'>
      <div className='flex w-full items-center justify-between px-6'>
        <Link href={'/'}>
          <div className=' rounded-full bg-primary p-2 text-teal-50 shadow-md transition-transform duration-300 hover:scale-110'>
            <RiHomeFill className='h-6 w-6 ' />
          </div>
        </Link>
        <Link href={'/calendar'}>
          <div
            style={{ boxShadow: '4px 4px 4px rgba(13, 148, 136, 0.25)' }}
            className='-translate-y-8 rounded-full bg-primary p-3 text-teal-50 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl'
          >
            <RiCalendarFill className='h-6 w-6' />
          </div>
        </Link>
        <Link href={'/expense'}>
          <div className='text-teal-50 transition-transform duration-300  hover:scale-110 hover:text-teal-200'>
            <RiMoneyEuroCircleFill className='h-12 w-12 text-primary drop-shadow-md' />
          </div>
        </Link>
      </div>
    </div>
  )
}

export { Footer }
