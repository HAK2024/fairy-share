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
import { HouseType } from '@/_types'
import { useRemoveMember } from '../hooks'

type RemoveMemberAlertModalProps = {
  house: HouseType
  isOpenAlert: boolean
  setIsOpenAlert: (isOpenAlert: boolean) => void
  setIsOpenModal: (isOpenModal: boolean) => void
  removedMemberId: number | null
}

const RemoveMemberAlertModal = ({
  house,
  isOpenAlert,
  setIsOpenAlert,
  setIsOpenModal,
  removedMemberId,
}: RemoveMemberAlertModalProps) => {
  const { onRemove, isPending: isRemoving } = useRemoveMember()
  const houseId = house.houseId

  const handleRemoveMember = () => {
    if (!removedMemberId) return
    onRemove(removedMemberId, houseId)

    setIsOpenAlert(false)
    setTimeout(() => {
      setIsOpenModal(true)
    }, 200)
  }

  const handleCancel = () => {
    setIsOpenModal(false)
    setTimeout(() => {
      setIsOpenModal(true)
    }, 200)
  }

  return (
    <AlertDialog open={isOpenAlert} onOpenChange={() => setIsOpenAlert(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All data associated with this member
            will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving} onClick={handleCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            isLoading={isRemoving}
            onClick={handleRemoveMember}
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { RemoveMemberAlertModal }
