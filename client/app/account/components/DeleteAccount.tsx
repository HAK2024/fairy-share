import { AlertDialogHeader, AlertDialogFooter } from '@/_components/ui'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@radix-ui/react-alert-dialog'
import React from 'react'
import { Button } from 'react-day-picker'
import { FiTrash } from 'react-icons/fi'
import { useDeleteAccount } from '../hooks'
import { Loading } from '@/_components/layout'
import { useGetMeQuery } from '@/_hooks/api'


const DeleteAccount = () => {
  const { data: user, isLoading } = useGetMeQuery()  
  if (isLoading || !user) return <Loading />

  const { onDelete, isPending } = useDeleteAccount()

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
            onClick={() => onDelete(user.id, user.houses.houseId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
}

export { DeleteAccount }
