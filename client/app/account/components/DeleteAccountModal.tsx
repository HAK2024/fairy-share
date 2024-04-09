import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/_components/ui'

type DeleteAccountModalProps = {
  isOpenDeleteModal: boolean
  setIsOpenDeleteModal: (isOpenDeleteModal: boolean) => void
  onDelete: () => void
  isPending: boolean
}

const DeleteAccountModal = ({
  isOpenDeleteModal,
  setIsOpenDeleteModal,
  onDelete,
  isPending,
}: DeleteAccountModalProps) => {
  return (
    <AlertDialog
      open={isOpenDeleteModal}
      onOpenChange={() => setIsOpenDeleteModal(false)}
    >
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
          <AlertDialogAction isLoading={isPending} onClick={() => onDelete()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteAccountModal }
