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

type LeaveHouseModalProps = {
  isOpenLeaveHouseModal: boolean
  setIsOpenLeaveHouseModal: (isOpenLeaveHouseModal: boolean) => void
  onRemove: (userId: number, houseId: number) => void
  isPending: boolean
  userId: number
  houseId: number
}

const LeaveHouseModal = ({
  isOpenLeaveHouseModal,
  setIsOpenLeaveHouseModal,
  onRemove,
  isPending,
  userId,
  houseId,
}: LeaveHouseModalProps) => {
  return (
    <AlertDialog
      open={isOpenLeaveHouseModal}
      onOpenChange={() => setIsOpenLeaveHouseModal(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All data associated with the current
            house will be permanently deleted from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            isLoading={isPending}
            onClick={() => onRemove(userId, houseId)}
          >
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { LeaveHouseModal }
