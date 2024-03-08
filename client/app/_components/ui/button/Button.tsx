import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { PiSpinnerGap } from 'react-icons/pi'
import { cn } from '@/_utils'

const buttonVariants = cva(
  'text-sm inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-teal-300 bg-teal-100 text-teal-800 hover:bg-teal-200',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        secondaryOutline:
          'border border-secondary bg-slate-50 text-secondary-800 hover:bg-slate-100',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 md:h-11 md:px-6 md:py-4 text-lg',
        sm: 'h-9 rounded-md px-3 md:h-10 md:px-4',
        lg: 'h-11 rounded-md px-8 md:h-12 md:px-8 md:text-lg',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    if (isLoading)
      return (
        <Comp
          className={`${cn(
            buttonVariants({ variant, size, className }),
          )} pointer-events-none`}
          ref={ref}
          {...props}
        >
          <PiSpinnerGap className={'animate-spin'} />
        </Comp>
      )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
