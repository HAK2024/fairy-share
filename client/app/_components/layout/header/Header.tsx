import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/_components/ui'
import { SettingDropdown } from '..'

const Header = () => {
  return (
    <div className='flex h-16 w-full items-center justify-between bg-primary px-4 text-primary-foreground md:h-20 md:px-14'>
      <Image
        // I got the warn below, so I set priority true to fix it. If you set it false, it behaves weirdly when it's rendered for the first time.

        // warn-once.js:16 Image with src "/images/logo/logo.png" was detected as the Largest Contentful Paint (LCP).
        // Please add the "priority" property if this image is above the fold.
        // Read more: https://nextjs.org/docs/api-reference/next/image#priority
        priority={true}
        src={`/images/logo/logo.png`}
        alt={'logo'}
        // TODO: I got the warn below, and need to fix it later

        //   warn-once.js:16 Image with src "/images/logo/logo.png" has either width or height modified, but not the other.
        //   If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.

        width={'150'}
        height={'150'}
        // I fixed this warn by setting styles with h-auto and w-auto
        className='h-auto w-auto'
      />
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
