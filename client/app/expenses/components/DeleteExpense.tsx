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
import { useDeleteExpense } from '../hooks'

type DeleteExpenseProps = {
  expenseId: number
}

const DeleteExpense = ({ expenseId }: DeleteExpenseProps) => {
  const { onDelete, isPending } = useDeleteExpense()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'destructiveOutline'}
          size='smIcon'
          className='flex gap-1'
        >
          <FiTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            expense and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            isLoading={isPending}
            onClick={() => onDelete(expenseId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteExpense }
