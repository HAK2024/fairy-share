import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { useLogoutMutation } from '@/_hooks/api'
import { resetAllStores } from '@/_stores'

const SettingDropdown = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useLogoutMutation()
  const router = useRouter()

  const { isAdmin } = useGetHouseInfo()

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
      <DropdownMenuTrigger className='ml-2 hover:text-gray-300' asChild>
        <button aria-label='Show setting menu'>
          <FiSettings className='h-7 w-7' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='m-4 w-52 font-medium'>
        <DropdownMenuItem
          className='cursor-pointer focus:bg-primary focus:text-primary-foreground'
          asChild
        >
          <button
            onClick={() => router.push('/account')}
            className='flex w-full items-center gap-2'
          >
            <FiUser className='h-5 w-5' />
            <span>Account</span>
          </button>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem
            className='cursor-pointer focus:bg-primary focus:text-primary-foreground'
            asChild
          >
            <button
              onClick={() => router.push(`/house/edit`)}
              className='flex w-full items-center gap-2'
            >
              <FiSettings className='h-5 w-5' />
              <span>House Settings</span>
            </button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className='cursor-pointer focus:bg-primary focus:text-primary-foreground'
          asChild
        >
          <button
            className='flex w-full items-center gap-2 disabled:pointer-events-none disabled:opacity-50'
            onClick={logoutHandler}
            disabled={isPending}
          >
            <FiLogOut className='h-5 w-5' />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SettingDropdown }
