import Image from 'next/image'
import Link from 'next/link'
import { SettingDropdown } from '..'

type HeaderProps = {
  hasNavigation?: boolean
}

const Header = ({ hasNavigation = true }: HeaderProps) => {
  return (
    <header className='flex h-16 w-full items-center justify-between bg-primary px-4 text-primary-foreground md:h-20 md:px-14'>
      {hasNavigation ? (
        <Link href='/'>
          <Image
            priority={true}
            src={`/images/logo/logo.png`}
            alt={'logo'}
            width={179}
            height={32}
          />
        </Link>
      ) : (
        <Image
          priority={true}
          src={`/images/logo/logo.png`}
          alt={'logo'}
          width={179}
          height={32}
        />
      )}
      <div className={'flex items-center justify-between gap-10'}>
        {/* Navigation menu: Visible on devices wider than "md" breakpoint */}
        <nav
          className={`hidden items-center justify-between gap-10 ${hasNavigation ? 'md:flex' : 'md:hidden'}`}
        >
          <Link
            href={'/'}
            className='hover-underline-animation text-lg font-semibold hover:text-teal-800'
          >
            Home
          </Link>
          <Link
            href={'/tasks'}
            className='hover-underline-animation text-lg font-semibold hover:text-teal-800'
          >
            Calendar
          </Link>
          <Link
            href={'/expenses'}
            className='hover-underline-animation text-lg font-semibold hover:text-teal-800'
          >
            Expense
          </Link>
        </nav>
        {/* End of navigation menu */}
        <SettingDropdown />
      </div>
    </header>
  )
}

export { Header }
