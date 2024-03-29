// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/_components/ui'
// import { useRemoveMember } from '../hooks'

// type RemoveMemberProps = {
//   setIsOpenModal: (isOpen: boolean) => void
//   isOpenAlert: boolean
//   setIsOpenAlert: (isOpen: boolean) => void
//   houseId: number | undefined
//   userId: number | null
// }

// const RemoveMemberAlert = ({
//   setIsOpenModal,
//   isOpenAlert,
//   setIsOpenAlert,
//   houseId,
//   userId,
// }: RemoveMemberProps) => {
//   const { onRemove, isPending: isRemoving } = useRemoveMember()

//   const handleRemoveMember = (userId: number) => {
//     if (!houseId) return

//     onRemove(userId, houseId)
//   }

//   return (
//     <AlertDialog>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your
//             account and remove the data from our servers.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             isLoading={isRemoving}
//             onClick={handleRemoveMember}
//           >
//             Remove
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }

// export { RemoveMemberAlert }
