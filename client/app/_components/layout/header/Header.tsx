import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/_components/ui'
import { SettingDropdown } from '..'

type HeaderProps = {
  hasNavigation?: boolean
}

const Header = ({ hasNavigation = true }: HeaderProps) => {
  return (
    <div className='flex h-16 w-full items-center justify-between bg-primary px-4 text-primary-foreground md:h-20 md:px-14'>
      {hasNavigation ? (
        <Link href='/'>
          <Image
            priority={true}
            src={`/images/logo/logo.png`}
            alt={'logo'}
            width={'150'}
            height={'150'}
            className='h-auto w-auto'
          />
        </Link>
      ) : (
        <Image
          priority={true}
          src={`/images/logo/logo.png`}
          alt={'logo'}
          width={'150'}
          height={'150'}
          className='h-auto w-auto'
        />
      )}

      <div
        className={`items-center justify-between gap-4 ${hasNavigation ? 'flex' : 'hidden'}`}
      >
        {/* Navigation menu: Visible on devices wider than "md" breakpoint */}
        <div className='hidden items-center justify-between gap-4 md:flex'>
          <Link href={'/'}>
            <Button variant={'ghost'} className='text-md font-semibold'>
              Home
            </Button>
          </Link>
          <Link href={'/calendar'}>
            <Button variant={'ghost'} className='text-md font-semibold'>
              Calendar
            </Button>
          </Link>
          <Link href={'/expense'}>
            <Button variant={'ghost'} className='text-md font-semibold'>
              Expense
            </Button>
          </Link>
        </div>
        {/* End of navigation menu */}
        <SettingDropdown />
      </div>
    </div>
  )
}

export { Header }
