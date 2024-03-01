import Link from 'next/link'
import { Button, Logo, SettingDropdown } from '..'

const Header = () => {
  return (
    <div className='flex h-16 w-full items-center justify-between bg-primary px-4 text-primary-foreground md:h-20 md:px-14'>
      <Logo width={150} height={150} />
      <div className='flex items-center justify-between gap-2'>
        {/* Navigation menu: Visible on devices wider than "md" breakpoint */}
        <div className='hidden items-center justify-between gap-2 md:flex'>
          <Link href={'/'}>
            <Button variant={'ghost'}>Home</Button>
          </Link>
          <Link href={'/calendar'}>
            <Button variant={'ghost'}>Calendar</Button>
          </Link>
          <Link href={'/expense'}>
            <Button variant={'ghost'}>Expense</Button>
          </Link>
        </div>
        {/* End of navigation menu */}
        <SettingDropdown />
      </div>
    </div>
  )
}

export { Header }
