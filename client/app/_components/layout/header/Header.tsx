import Image from 'next/image'
import Link from 'next/link'
import { SettingDropdown } from '..'

const Header = () => {
  return (
    <div className='flex h-16 w-full items-center justify-between bg-primary px-4 text-primary-foreground md:h-20 md:px-14'>
      {/* Set the exact ratio of the original image so that you can avoid getting a warn */}
      <Image
        priority={true}
        src={`/images/logo/logo.png`}
        alt={'logo'}
        width={179}
        height={32}
      />
      <div className='flex items-center justify-between gap-10'>
        {/* Navigation menu: Visible on devices wider than "md" breakpoint */}
        <div className='hidden items-center justify-between gap-10 md:flex'>
          <Link
            href={'/'}
            className='hover-underline-animation text-lg font-semibold'
          >
            Home
          </Link>
          <Link
            href={'/calendar'}
            className='hover-underline-animation text-lg font-semibold'
          >
            Calendar
          </Link>
          <Link
            href={'/expense'}
            className='hover-underline-animation text-lg font-semibold'
          >
            Expense
          </Link>
        </div>
        {/* End of navigation menu */}
        <SettingDropdown />
      </div>
    </div>
  )
}

export { Header }
