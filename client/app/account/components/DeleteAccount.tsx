import { FiTrash } from 'react-icons/fi'
import { Loading } from '@/_components/layout'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'
import { useDeleteAccount } from '../hooks'

const DeleteAccount = () => {
  const { data: user, isLoading } = useGetMeQuery()
  const { onDelete, isPending } = useDeleteAccount()

  if (isLoading || !user) return <Loading />

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructiveOutline'} size='sm' className='flex gap-1'>
          <FiTrash />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            isLoading={isPending}
            onClick={() => onDelete(user.houses[0].houseId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteAccount }
