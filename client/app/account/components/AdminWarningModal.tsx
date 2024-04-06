import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/_components/ui'

type AdminWarningModalProps = {
  isOpenAdminWarningModal: boolean
  setIsOpenAdminWarningModal: (isOpenAdminWarningModal: boolean) => void
}

const AdminWarningModal = ({
  isOpenAdminWarningModal,
  setIsOpenAdminWarningModal,
}: AdminWarningModalProps) => {
  const router = useRouter()

  const handleGoToHouseSettings = () => {
    router.push('/house/edit')
    setIsOpenAdminWarningModal(false)
  }

  return (
    <AlertDialog
      open={isOpenAdminWarningModal}
      onOpenChange={() => setIsOpenAdminWarningModal(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You are the sole admin in this house.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Before proceeding, please assign another admin or delete the house
            in the House Settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex items-center'>
          <span
            className='cursor-pointer text-teal-600 underline'
            onClick={handleGoToHouseSettings}
          >
            House Settings
          </span>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { AdminWarningModal }
