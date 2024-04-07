import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  RouterLink,
} from '@/_components/ui'

type AdminWarningModalProps = {
  isOpenAdminWarningModal: boolean
  setIsOpenAdminWarningModal: (isOpenAdminWarningModal: boolean) => void
}

const AdminWarningModal = ({
  isOpenAdminWarningModal,
  setIsOpenAdminWarningModal,
}: AdminWarningModalProps) => {
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
          <RouterLink href='/house/edit' className='text-teal-600 underline'>
            House Settings
          </RouterLink>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { AdminWarningModal }
