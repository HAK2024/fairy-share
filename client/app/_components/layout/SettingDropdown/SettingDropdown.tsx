import { RxGear, RxPerson, RxExit } from 'react-icons/rx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/_components/ui'

const SettingDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='pl-2 focus:outline-none'>
        <RxGear className='h-7 w-7' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='m-4 w-52 font-medium'>
        {/* TODO: Need to put the onClick handler for each item later when implementing each feature */}
        <DropdownMenuItem className='cursor-pointer focus:bg-primary focus:text-primary-foreground'>
          <div className='flex items-center gap-2'>
            <RxPerson className='h-4 w-4' />
            <span>Profile</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer focus:bg-primary focus:text-primary-foreground'>
          <div className='flex items-center gap-2'>
            <RxGear className='h-4 w-4' />
            <span>House setting</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer focus:bg-primary focus:text-primary-foreground'>
          <div className='flex items-center gap-2'>
            <RxExit className='h-4 w-4' />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SettingDropdown }
