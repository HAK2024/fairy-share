'use client';

import { useFormStatus } from 'react-dom';
import { PiSpinnerGap } from 'react-icons/pi';
import { Button, ButtonProps } from '@/_components/ui';

type SubmitButtonProps = {
  actionText: string;
  pendingText?: boolean;
} & ButtonProps;

export function SubmitButton({
  actionText,
  pendingText,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={'lg'}
      className='text-lg'
      disabled={pending}
      {...props}
    >
      {pending ? (
        <>
          <PiSpinnerGap className={`${pendingText && 'mr-3'} animate-spin`} />
          {pendingText}
        </>
      ) : (
        actionText
      )}
    </Button>
  );
}
