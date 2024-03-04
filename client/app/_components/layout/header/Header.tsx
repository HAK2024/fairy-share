import Link from 'next/link'
import { Button } from '@/_components/ui'
import { Logo, SettingDropdown } from '..'

const Header = () => {
  return (
    <div className='flex h-16 w-full items-center justify-between bg-primary px-4 text-primary-foreground md:h-20 md:px-14'>
      <Logo width={150} height={150} />
      <div className='flex items-center justify-between gap-4'>
        {/* Navigation menu: Visible on devices wider than "md" breakpoint */}
        <div className='hidden items-center justify-between gap-4 md:flex'>
          <Link href={'/'}>
            {/* Figma design text-lg and font-bold feels a little too much */}
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
