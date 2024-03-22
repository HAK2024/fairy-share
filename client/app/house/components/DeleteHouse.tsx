import { FiTrash } from 'react-icons/fi'
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
import { useDeleteHouse } from '../hooks'

type DeleteHouseProps = {
  houseId: number
}

const DeleteHouse = ({ houseId }: DeleteHouseProps) => {
  const { onDelete, isPending } = useDeleteHouse()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructiveOutline'} size='sm' className='flex gap-1'>
          <FiTrash />
          Delete House
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
            onClick={() => onDelete(houseId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteHouse }
