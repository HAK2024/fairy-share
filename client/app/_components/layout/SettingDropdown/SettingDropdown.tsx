import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { RxGear, RxPerson, RxExit } from 'react-icons/rx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/_components/ui'
import { useLogoutMutation } from '@/_hooks/api'
import { resetAllStores } from '@/_stores'

const SettingDropdown = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useLogoutMutation()
  const router = useRouter()

  const logoutHandler = () => {
    mutate(undefined, {
      onSuccess: () => {
        resetAllStores()
        queryClient.clear()
        queryClient.invalidateQueries({ queryKey: ['me'] })
        router.push('/login')
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ml-2' asChild>
        <button>
          <RxGear className='h-7 w-7' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='m-4 w-52 font-medium'>
        {/* TODO: Change URL */}
        <DropdownMenuItem
          className='cursor-pointer focus:bg-primary focus:text-primary-foreground'
          asChild
        >
          <button
            onClick={() => router.push('/profile')}
            className='flex w-full items-center gap-2'
          >
            <RxPerson className='h-4 w-4' />
            <span>Profile</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer focus:bg-primary focus:text-primary-foreground'
          asChild
        >
          <button
            onClick={() => router.push(`/house/[id]/edit`)}
            className='flex w-full items-center gap-2'
          >
            <RxGear className='h-4 w-4' />
            <span>House setting</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer focus:bg-primary focus:text-primary-foreground'
          asChild
        >
          <button
            className='flex w-full items-center gap-2 disabled:pointer-events-none disabled:opacity-50'
            onClick={logoutHandler}
            disabled={isPending}
          >
            <RxExit className='h-4 w-4' />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SettingDropdown }
