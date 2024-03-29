import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/_components/ui'
import { HouseType } from '@/_types'
import { useRemoveMember } from '../hooks'

type RemoveMemberAlertProps = {
  house: HouseType
  isOpenAlert: boolean
  setIsOpenAlert: (isOpenAlert: boolean) => void
  removedMemberId: number | null
  setIsOpenModal: (isOpenModal: boolean) => void
}

const RemoveMemberAlert = ({
  house,
  isOpenAlert,
  setIsOpenAlert,
  removedMemberId,
  setIsOpenModal,
}: RemoveMemberAlertProps) => {
  const { onRemove, isPending: isRemoving } = useRemoveMember()
  const houseId = house?.houseId

  const handleRemoveMember = () => {
    if (!removedMemberId || !houseId) return
    onRemove(removedMemberId, houseId)
    setIsOpenAlert(false)
    setIsOpenModal(true)
  }

  return (
    <AlertDialog
      open={isOpenAlert}
      onOpenChange={(isOpen) => setIsOpenAlert(!isOpen)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you certain you wish to remove the member?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isRemoving}
            onClick={() => setIsOpenAlert(false)}
          >
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

export { RemoveMemberAlert }
