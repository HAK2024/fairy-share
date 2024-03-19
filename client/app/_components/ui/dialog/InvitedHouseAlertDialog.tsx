'use client'

import { useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog, DialogContent, DialogTitle } from '@/_components/ui/Dialog'
import { useCheckInvitedHouse } from '@/_hooks'

function InvitedHouseAlertDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  useCheckInvitedHouse(onOpen)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className='flex gap-4'>
          <FiAlertTriangle className='h-6 w-6 flex-shrink-0 text-red-800' />
          <div className='flex flex-col gap-4'>
            <DialogTitle className='h-6 leading-6'>
              You are already in a house
            </DialogTitle>
            <p>
              You can only be in one house at a time. <br />
              Please ask the house owner to remove you from the current house.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { InvitedHouseAlertDialog }
